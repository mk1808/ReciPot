package pl.mk.recipot.commons.factories;

import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public interface IFileResponseFactory {
	
	public <T> ResponseEntity<T> createResponse(T value, String name);

}
