package com.ds04.PatientMobileApp.util;

import com.ds04.PatientMobileApp.exceptions.UnprocessableImageException;
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

        Imgcodecs.imwrite("blurredImage.jpg", blurredImage);

        // Convert to Greyscale
        Mat greyImage = new Mat();
        Imgproc.cvtColor(blurredImage, greyImage, Imgproc.COLOR_BGR2GRAY);

        // Find edges using Canny Algorithm
        Mat cannyImage = new Mat();
        Imgproc.Canny(greyImage, cannyImage, 20, 50);

        // Dilate using structured element
        Mat dilateImage = new Mat();
        Imgproc.dilate(cannyImage, dilateImage, new Mat(), new Point(-1, -1), 1);

        Imgcodecs.imwrite("processedImage.jpg", dilateImage);

        return dilateImage;
    }

    public static List<MatOfPoint> findContoursAndIdentifySquares(final Mat processed, final Mat originalImage) {

        // Find contours
        List<MatOfPoint> allContours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(processed, allContours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_NONE);

        // Filter contours to look for reactive strip squares
        List<MatOfPoint> squares = new ArrayList<>();
        List<Rect> squareCoordinates = new ArrayList<>();
        for (MatOfPoint contour : allContours) {
            MatOfPoint2f approxCurve = new MatOfPoint2f();
            MatOfPoint2f contour2f = new MatOfPoint2f(contour.toArray());
            double approxDistance = Imgproc.arcLength(contour2f, true) * 0.02;
            Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);
            MatOfPoint approxMatOfPoint = new MatOfPoint(approxCurve.toArray());

            double contourArea = Imgproc.contourArea(approxMatOfPoint);
            boolean isNotNoise = approxCurve.total() == 4 && contourArea > 60000 && contourArea < 800000;

            if (isNotNoise) {
                System.out.println("Contour Area: " + contourArea);
                squares.add(approxMatOfPoint);
                Rect squareRect = Imgproc.boundingRect(approxMatOfPoint);
                squareCoordinates.add(squareRect);
            }
        }

        System.out.println("Number of Squares identified: " + squareCoordinates.size());
        System.out.println("Number of Squares identified (MoP): " + squares.size());

        // Nested for loop removes any overlapping Rect objects
        for (int i = 0; i < squareCoordinates.size(); i++) {
            Rect rect1 = squareCoordinates.get(i);
            for (int j = i + 1; j < squareCoordinates.size(); j++) {
                Rect rect2 = squareCoordinates.get(j);

                boolean doOverlap = rect1.tl().x < rect2.br().x &&
                        rect1.br().x > rect2.tl().x &&
                        rect1.tl().y < rect2.br().y &&
                        rect1.br().y > rect2.tl().y;

                System.out.println("Checking overlap");

                // check if the intersection rectangle is valid
                if (doOverlap) {
                    double area1 = rect1.area();
                    double area2 = rect2.area();

                    System.out.println("Overlap detected");

                    squareCoordinates.remove(area1 < area2 ? i : j);
                    squares.remove(area1 < area2 ? i : j);
                    i--;
                    break;
                }
            }
        }

        System.out.println("Number of Squares not overlapping: " + squareCoordinates.size());
        System.out.println("Number of Squares not overlapping (MoP): " + squares.size());

        // Draw filtered contours on image and save
        Imgproc.drawContours(
                originalImage,
                squares,
                -1,
                new Scalar(0, 255, 0),
                3
        );

        // Crop image to obtain two largest squares
        for (int i = 0; i < squareCoordinates.size() ; i++) {
            Rect squareRect = squareCoordinates.get(i);
            Mat square = originalImage.submat(squareRect);
            Imgcodecs.imwrite("square" + (i + 1) + ".jpg", square);
        }

        Imgcodecs.imwrite("identifiedSquares.jpg", originalImage);

        // Check two squares detected
        if (squareCoordinates.size() != 2){
            throw new UnprocessableImageException("Control and Reactive squares could not be identified in provided image");
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

        System.out.println("Mean Control Strip Pixel Value: " + meanControlStripColour);

        // Calculate mean pixel vale for reactive strip
        Scalar meanReactiveStripColour = calculateMeanPixelColour(reactiveStrip, "reactive", originalImage);

        System.out.println("Mean Reactive Strip Pixel Value: " + meanReactiveStripColour);

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
    public static BufferedImage convertMatToBufferedImage(final Mat mat) {
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
