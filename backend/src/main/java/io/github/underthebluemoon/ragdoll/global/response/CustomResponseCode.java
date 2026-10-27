package io.github.underthebluemoon.ragdoll.global.response;


import org.springframework.http.HttpStatus;

public enum CustomResponseCode {

    // enum
    // success
    SUCCESS(HttpStatus.OK, "S000"),
    // common
    NOT_FOUND(HttpStatus.NOT_FOUND, "C001"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "C002"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C999"),
    // folder
    FOLDER_NOT_FOUND(HttpStatus.NOT_FOUND, "F001"),
    // document
    DOCUMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "D001");

    // field
    private final HttpStatus status;
    private final String code;

    // constructor
    CustomResponseCode(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    // getter
    public HttpStatus getStatus() { return status; }
    public String getCode() { return code; }


}
