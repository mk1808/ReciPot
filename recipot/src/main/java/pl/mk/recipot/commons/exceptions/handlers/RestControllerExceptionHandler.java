package pl.mk.recipot.commons.exceptions.handlers;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import pl.mk.recipot.commons.dtos.Response;

import pl.mk.recipot.commons.exceptions.BadRequestException;
import pl.mk.recipot.commons.exceptions.ConflictException;
import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.exceptions.GoneException;
import pl.mk.recipot.commons.exceptions.NotFoundException;
import pl.mk.recipot.commons.exceptions.NotImplementedException;
import pl.mk.recipot.commons.exceptions.UnauthorizedException;
import pl.mk.recipot.commons.factories.BadRequestResponseFactory;
import pl.mk.recipot.commons.factories.ConflictResponseFactory;
import pl.mk.recipot.commons.factories.ForbiddenResponseFactory;
import pl.mk.recipot.commons.factories.GoneResponseFactory;
import pl.mk.recipot.commons.factories.IErrorResponseFactory;
import pl.mk.recipot.commons.factories.NotFoundResponseFactory;
import pl.mk.recipot.commons.factories.NotImplementedResponseFactory;
import pl.mk.recipot.commons.factories.UnauthorizedResponseFactory;

@ControllerAdvice
public class RestControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { UnauthorizedException.class })
    protected ResponseEntity<Response<Void>> handleUnauthorized(RuntimeException ex, WebRequest request) {
        return getResponse(ex,  "you dont have access",  new UnauthorizedResponseFactory());
    }
    
    @ExceptionHandler(value = { ForbiddenException.class })
    protected ResponseEntity<Response<Void>> handleForbidden(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "forbidden",  new ForbiddenResponseFactory());
    }
    
    @ExceptionHandler(value = { BadRequestException.class })
    protected ResponseEntity<Response<Void>> handleBadRequest(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "bad request",  new BadRequestResponseFactory());
    }
    
    @ExceptionHandler(value = { ConflictException.class })
    protected ResponseEntity<Response<Void>> handleConflict(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "conflict",  new ConflictResponseFactory());
    }
    
    @ExceptionHandler(value = { GoneException.class })
    protected ResponseEntity<Response<Void>> handleGone(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "gone",  new GoneResponseFactory());
    }
    
    @ExceptionHandler(value = { NotFoundException.class })
    protected ResponseEntity<Response<Void>> handleNotFound(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "not found",  new NotFoundResponseFactory());
    }
    
    @ExceptionHandler(value = { NotImplementedException.class })
    protected ResponseEntity<Response<Void>> handleNotImplemented(RuntimeException ex, WebRequest request) {
    	return getResponse(ex,  "not Implemented",  new NotImplementedResponseFactory());
    }

	@ExceptionHandler(value = { ConstraintViolationException.class })
	protected ResponseEntity<Object> handleNotImplemented(ConstraintViolationException ex, WebRequest request) {
		String fieldsConstraintVoildations = ex.getConstraintViolations()
				.stream()
				.map(ConstraintViolation::getMessage)
				.collect(Collectors.joining("\",\"", "[\"", "\"]"));
		return getResponse("Validation failed", fieldsConstraintVoildations, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			org.springframework.http.HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		String fieldsConstraintVoildations = ex.getBindingResult()
				.getFieldErrors().stream()
				.map(FieldError::getDefaultMessage)
				.collect(Collectors.joining("\",\"", "[\"", "\"]"));
		return getResponse("Validation failed", fieldsConstraintVoildations, HttpStatus.BAD_REQUEST);
	}

    private ResponseEntity<Response<Void>> getResponse(RuntimeException ex, String details, IErrorResponseFactory exception) {
    	return exception.createResponse(ex.getMessage(), details);
    }
    
	private ResponseEntity<Object> getResponse(String message, String details, HttpStatus status) {
		Response response = Response.builder()
				.message(message)
				.details(details)
				.build();
		return new ResponseEntity<>(response, status);
	}

}