package io.github.underthebluemoon.ragdoll.global.exception;

import io.github.underthebluemoon.ragdoll.global.response.CustomResponseCode;
import io.github.underthebluemoon.ragdoll.global.response.ResponseCodeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // logging
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Http 응답 만들기
     * @param responseCode 커스텀 응답
     * @return Http 응답 - body에 커스텀 응답
     */
    private ResponseEntity<ResponseCodeDTO<Void>> generateErrorResponse(CustomResponseCode responseCode) {
        return ResponseEntity.status(responseCode.getStatus()).body(ResponseCodeDTO.error(responseCode));
    }

    /**
     * 비즈니스 예외 처리
     * @param e 비즈니스 예외
     * @return Http 응답
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ResponseCodeDTO<Void>> handle(BusinessException e) {
        log.debug(e.getMessage(), e);
        return generateErrorResponse(e.getResponseCode());
    }

    // spring 예외

    /**
     * 메서드 인자 타입 예외 처리
     * @param e 메서드 인자 타입 예외
     * @return Http 응답 - BAD_REQUEST
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseCodeDTO<Void>> handle(MethodArgumentTypeMismatchException e) {
        log.debug("타입 불일치: {}", e.getMessage());
        return generateErrorResponse(CustomResponseCode.BAD_REQUEST);
    }

    /**
     * url 쿼리 파라미터 없음 예외 처리
     * @param e 파라미터 없음 예외
     * @return Http 응답 - BAD_REQUEST
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ResponseCodeDTO<Void>> handle(MissingServletRequestParameterException e) {
        log.debug("파라미터 없음: {}", e.getMessage());
        return generateErrorResponse(CustomResponseCode.BAD_REQUEST);
    }

    /**
     * 아무 컨트롤러에도 없는 주소 예외 처리
     * @param e 컨트롤러 없음 예외
     * @return Http 응답 - NOT_FOUND
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseCodeDTO<Void>> handle(NoResourceFoundException e) {
        log.debug("없는 주소: {}", e.getMessage());
        return generateErrorResponse(CustomResponseCode.NOT_FOUND);
    }

    /**
     * 예외 처리가 없는 에러. 즉, 예상하지 못한 예외
     * @param e 예외 객체
     * @return Http 응답 - INTERNAL_SERVER_ERROR
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseCodeDTO<Void>> handle(Exception e) {
        log.error("예상하지 못한 에러", e);
        return generateErrorResponse(CustomResponseCode.INTERNAL_SERVER_ERROR);
    }
}
