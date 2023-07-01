package pl.mk.recipot.commons.exceptions.handlers;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.exceptions.UnauthorizedException;
import pl.mk.recipot.commons.factories.UnauthorizedResponseFactory;

@ControllerAdvice
public class RestControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { UnauthorizedException.class })
    protected ResponseEntity<Response<Void>> handleUnauthorized(RuntimeException ex, WebRequest request) {
        String message = ex.getMessage();
        ResponseEntity<Response<Void>> responseBody = new UnauthorizedResponseFactory()
        		.createResponse(message, "u dont have access");
        return responseBody;
    }
}