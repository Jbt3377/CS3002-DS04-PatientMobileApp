package com.ds04.PatientMobileApp.util;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.util.ArrayList;
import java.util.List;

public class ReactiveStripDetectionUtil {

    public static Mat processImage(final Mat mat){

        // Apply Blurring with Gaussian filter
        Mat blurredImage = new Mat();
        Imgproc.GaussianBlur(mat, blurredImage, new Size(3, 3), 0);

        Imgcodecs.imwrite("output/blurredImage.jpg", blurredImage);

        // Convert to Greyscale
        Mat greyImage = new Mat();
        Imgproc.cvtColor(blurredImage, greyImage, Imgproc.COLOR_BGR2GRAY);

        // Find edges using Canny Algorithm
        Mat cannyImage = new Mat();
        Imgproc.Canny(greyImage, cannyImage, 20, 50);

        // Dilate using structured element
        Mat dilateImage = new Mat();
        Imgproc.dilate(cannyImage, dilateImage, new Mat(), new Point(-1, -1), 1);

        Imgcodecs.imwrite("output/processedImage.jpg", dilateImage);

        return dilateImage;
    }

    public static List<MatOfPoint> findContoursAndIdentifySquares(final Mat processed, final Mat originalImage) {

        // Find contours
        List<MatOfPoint> allContours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(processed, allContours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_NONE);

        // Filter contours to look for reactive strip squares
        List<MatOfPoint> squares = new ArrayList<>();
        List<Rect> squareCoords = new ArrayList<>();
        for (MatOfPoint contour : allContours) {
            MatOfPoint2f approxCurve = new MatOfPoint2f();
            MatOfPoint2f contour2f = new MatOfPoint2f(contour.toArray());
            double approxDistance = Imgproc.arcLength(contour2f, true) * 0.02;
            Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);
            MatOfPoint approxMatOfPoint = new MatOfPoint(approxCurve.toArray());

            double contourArea = Imgproc.contourArea(approxMatOfPoint);
            boolean isNotNoise = approxCurve.total() == 4 && contourArea > 30000 && contourArea < 800000;

            if (isNotNoise) {
                System.out.println("Contour Area: " + contourArea);
                squares.add(approxMatOfPoint);
                Rect squareRect = Imgproc.boundingRect(approxMatOfPoint);
                squareCoords.add(squareRect);
            }
        }

        System.out.println("Number of Squares identified: " + squareCoords.size());

        // Draw filtered contours on image and save
        Imgproc.drawContours(
                originalImage,
                squares,
                -1,
                new Scalar(0, 255, 0),
                2
        );

        // Crop image to obtain two largest squares
        for (int i = 0; i < squareCoords.size() ; i++) {
            Rect squareRect = squareCoords.get(i);
            Mat square = originalImage.submat(squareRect);
            Imgcodecs.imwrite("output/square" + (i + 1) + ".jpg", square);
        }

        Imgcodecs.imwrite("output/filteredContours.jpg", originalImage);

        // Check two squares detected
        if (squareCoords.size() != 2){
            return null;
        }

        return squares;
    }

    public static void extractPixelValues(final List<MatOfPoint> identifiedSquares, final Mat originalImage) {
        // Get squares
        MatOfPoint square1 = identifiedSquares.get(0);
        MatOfPoint square2 = identifiedSquares.get(1);

        // Find center points of two squares
        Point middleOfSquare1 = findCenterPointOfRect(Imgproc.boundingRect(square1));
        Point middleOfSquare2 = findCenterPointOfRect(Imgproc.boundingRect(square2));

        MatOfPoint controlStrip;
        MatOfPoint reactiveStrip;

        // Determine control and reactive strip
        if (middleOfSquare1.y > middleOfSquare2.y) {
            controlStrip = square1;
            reactiveStrip = square2;
        } else {
            controlStrip = square2;
            reactiveStrip = square1;
        }

        // Calculate mean pixel values for both strips
        Scalar meanControlStripColour = calculateMeanPixelColour(controlStrip, "control", originalImage);

        // Calculate mean pixel vale for reactive strip
        Scalar meanReactiveStripColour = calculateMeanPixelColour(reactiveStrip, "reactive", originalImage);

        // Apply to algorithm
        // TODO Add Algo Code

    }

    /**
     * Method calculates the center point of a Rect
     */
    private static Point findCenterPointOfRect(Rect rect) {
        return new Point(rect.x + (float)rect.width/2, rect.y + (float)rect.height/2);
    }

    /**
     * Method calculates a mean pixel colour value within a region of interest
     */
    private static Scalar calculateMeanPixelColour(MatOfPoint square, String squareIdentity, Mat originalImage) {
        Rect rect = Imgproc.boundingRect(square);
        Mat squareImage = originalImage.submat(rect);
        Scalar meanColor = Core.mean(squareImage);
        System.out.println("Mean color in " + squareIdentity + " square: " + meanColor);
        return meanColor;
    }

    /**
     * Method converts Matrix to BufferedImage
     */
    private static BufferedImage convertMatToBufferedImage(final Mat mat) {
        // Create buffered image
        BufferedImage bufferedImage = new BufferedImage(
                mat.width(),
                mat.height(),
                mat.channels() == 1 ? BufferedImage.TYPE_BYTE_GRAY : BufferedImage.TYPE_3BYTE_BGR
        );

        // Write data to image
        WritableRaster raster = bufferedImage.getRaster();
        DataBufferByte dataBuffer = (DataBufferByte) raster.getDataBuffer();
        mat.get(0, 0, dataBuffer.getData());

        return bufferedImage;
    }

}
