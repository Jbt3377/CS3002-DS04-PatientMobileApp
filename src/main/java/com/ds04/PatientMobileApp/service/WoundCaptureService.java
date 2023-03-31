package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.exceptions.UnprocessableImageException;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import com.ds04.PatientMobileApp.util.ReactiveStripDetectionUtil;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Scalar;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.Date;
import java.util.List;

@Component
public class WoundCaptureService {

    @Autowired
    private final WoundCaptureRepository woundCaptureRepository;

    public WoundCaptureService(WoundCaptureRepository woundCaptureRepository) {
        this.woundCaptureRepository = woundCaptureRepository;
    }

    public ResponseEntity createWoundCapture(String uid, String woundId, Date captureDate, MultipartFile photo) {
        try {
            // Check provided parameters
            if (uid == null || uid.isEmpty()) {
                throw new IllegalArgumentException("uid property must be provided");
            } else if (woundId == null || woundId.isEmpty()) {
                throw new IllegalArgumentException("woundId property must be provided");
            } else if (captureDate == null) {
                throw new IllegalArgumentException("captureDate property must be provided");
            } else if (photo == null) {
                throw new IllegalArgumentException("photo must be provided");
            }

            // Build WoundCapture object
            WoundCapture woundCapture = new WoundCapture(uid, woundId, captureDate);

            // Assign WoundCaptureId
            if(woundCapture.getWoundCaptureId() == null){
                woundCapture.setWoundCaptureId();
            }

            // Image Processing //

            // Convert Image to Mat
            MatOfByte matOfByte = new MatOfByte(photo.getBytes());
            Mat image = Imgcodecs.imdecode(matOfByte, Imgcodecs.IMREAD_UNCHANGED);
            Mat originalImage = image.clone();

            // Process Image
            Mat processedImage = ReactiveStripDetectionUtil.processImage(image);

            // Find Contours and identify Regions of Interest
            List<MatOfPoint> identifiedSquares = ReactiveStripDetectionUtil.findContoursAndIdentifySquares(processedImage, image);

            // Encode the image in memory as a JPEG byte array
            MatOfByte encodedImage = new MatOfByte();
            Imgcodecs.imencode(".jpg", image, encodedImage);

            // Convert MatOfByte to byte array
            byte[] byteArray = encodedImage.toArray();

            // Extract Pixel Values
            List<Scalar> extractedPixelValues = ReactiveStripDetectionUtil.extractPixelValues(identifiedSquares, originalImage);

            // Apply Algorithm
            ReactiveStripDetectionUtil.calculateApparentAbsorbance(extractedPixelValues);

            return ResponseEntity.status(HttpStatus.OK).build();

//            System.out.println("Completed Processing");
//            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.create(woundCapture, byteArray));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An exception occurred when creating Wound Capture");
        }
    }
    public ResponseEntity getWoundCapture(String woundCaptureId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.findByWoundCaptureId(woundCaptureId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wound Capture");
        }
    }

    public ResponseEntity findWoundCapturesByUser(String uid){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(woundCaptureRepository.findByUid(uid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An exception occurred when searching for Wound Capture");
        }
    }
}
