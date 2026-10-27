package io.github.underthebluemoon.ragdoll.global.response;

public record ResponseCodeDTO<T>(String name, String code, T data) {

    // success
    public static <T> ResponseCodeDTO<T> success(T data) {
        return new ResponseCodeDTO<>(CustomResponseCode.SUCCESS.name(), CustomResponseCode.SUCCESS.getCode(), data);
    }

    // error
    public static ResponseCodeDTO<Void> error(CustomResponseCode responseCode) {
        return new ResponseCodeDTO<>(responseCode.name(), responseCode.getCode(), null);
    }
}
