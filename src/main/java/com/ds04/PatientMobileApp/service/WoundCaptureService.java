package com.ds04.PatientMobileApp.service;

import com.ds04.PatientMobileApp.entity.WoundCapture;
import com.ds04.PatientMobileApp.repository.WoundCaptureRepository;
import com.ds04.PatientMobileApp.util.CommonUtil;
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

            // Extract Pixel Values
            List<Scalar> extractedPixelValues = ReactiveStripDetectionUtil.extractPixelValues(identifiedSquares, originalImage, image);

            // Encode the image in memory as a JPEG byte array
            MatOfByte encodedImage = new MatOfByte();
            Imgcodecs.imencode(".jpg", image, encodedImage);

            // Convert MatOfByte to byte array
            byte[] byteArray = encodedImage.toArray();

            // Apply Absorbance Parameter Algorithm - disabled as this was a desired feature but not implemented
            // ReactiveStripDetectionUtil.calculateApparentAbsorbance(extractedPixelValues);
            // return ResponseEntity.status(HttpStatus.OK).build();

            System.out.println("Completed Processing");
            return CommonUtil.buildResponseEntity(woundCaptureRepository.create(woundCapture, byteArray), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when creating Wound Capture",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    public ResponseEntity getWoundCapture(String woundCaptureId){
        try {
            return CommonUtil.buildResponseEntity(
                    woundCaptureRepository.findByWoundCaptureId(woundCaptureId).convertToJson(),
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Wound Capture",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseEntity findWoundCapturesByUserId(String uid){
        try {
            return CommonUtil.buildResponseEntity(
                    CommonUtil.convertListOfWoundCapturesToJson(woundCaptureRepository.findByUid(uid)),
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return CommonUtil.buildResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return CommonUtil.buildResponseEntity(
                    "An exception occurred when searching for Wound Captures",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
