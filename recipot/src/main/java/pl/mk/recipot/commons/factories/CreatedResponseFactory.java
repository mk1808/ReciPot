package pl.mk.recipot.commons.factories;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public class CreatedResponseFactory implements IValueResponseFactory {

	@Override
	public <T> ResponseEntity<Response<T>> createResponse(T value) {
		Response response = Response
				.builder()
				.value(value)
				.build();
		
		return new ResponseEntity<Response<T>>(response, HttpStatus.CREATED);
	}
}
