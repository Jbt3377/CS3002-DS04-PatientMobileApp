package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public String createWoundCapture(WoundCapture woundCapture) {
        try {
//            // Check if WoundId provided
//            if(woundCapture.getWoundCaptureId() == null){
//                woundCapture.setWoundCaptureId();
//            }
//
//            return woundCaptureRepository.create(woundCapture);
            // Load image
            Mat image = Imgcodecs.imread("Bandage1.jpg");

            // Convert to greyscale
            Mat grayImage = new Mat();
            Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);

            // Apply thresholding
            Mat binaryImage = new Mat();
            Imgproc.threshold(grayImage, binaryImage, 50, 255, Imgproc.THRESH_BINARY);

            // Find contours
            List<MatOfPoint> contours = new ArrayList<>();
            Mat hierarchy = new Mat();
            Imgproc.findContours(binaryImage, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

            // Identify contours
            List<Rect> squareRectangles = new ArrayList<>();
            for (MatOfPoint contour : contours) {
                double contourArea = Imgproc.contourArea(contour);
                if (contourArea > 1000 && contourArea < 10000) { // adjust the area threshold to suit your image
                    Rect rect = Imgproc.boundingRect(contour);
                    double aspectRatio = (double) rect.width / rect.height;
                    if (aspectRatio > 0.8 && aspectRatio < 1.2) { // adjust the aspect ratio threshold to suit your image
                        squareRectangles.add(rect);
                    }
                }
            }

            Imgcodecs.imwrite("greyscale.jpg", grayImage);
            Imgcodecs.imwrite("thresholding.jpg", binaryImage);



            System.out.println("reached okay!");
            return "executed okay!";
        } catch (Exception e) {
            e.printStackTrace();
            return null; // TODO: Implement Exception Handling
        }
    }
}
