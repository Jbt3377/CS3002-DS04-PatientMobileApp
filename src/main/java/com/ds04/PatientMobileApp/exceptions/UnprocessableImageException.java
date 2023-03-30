package com.ds04.PatientMobileApp.exceptions;

public class UnprocessableImageException extends IllegalArgumentException {
    public UnprocessableImageException(String message) {
        super(message);
    }
}
