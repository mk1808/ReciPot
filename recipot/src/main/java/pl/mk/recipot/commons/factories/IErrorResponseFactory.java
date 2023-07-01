package pl.mk.recipot.commons.factories;

import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public interface IErrorResponseFactory {
	
	public <T> ResponseEntity<Response<T>> createResponse(String message, String details);

}
