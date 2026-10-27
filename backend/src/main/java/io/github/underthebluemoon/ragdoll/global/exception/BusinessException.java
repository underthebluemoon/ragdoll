package io.github.underthebluemoon.ragdoll.global.exception;

import io.github.underthebluemoon.ragdoll.global.response.CustomResponseCode;

public class BusinessException extends RuntimeException {

    // field
    private final CustomResponseCode responseCode;

    // constructor
    public BusinessException(CustomResponseCode responseCode) {
        super(responseCode.name());
        this.responseCode = responseCode;
    }

    public BusinessException(CustomResponseCode responseCode, String detailForLog) {
        super(detailForLog);
        this.responseCode = responseCode;
    }

    // getter
    public CustomResponseCode getResponseCode() { return responseCode; }
}
