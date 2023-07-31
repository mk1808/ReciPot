package pl.mk.recipot.commons.factories;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public class CreatedMessageResponseFactory implements IMessageResponseFactory {
	
	@Override
	public ResponseEntity<Response<Void>> createResponse(String message) {
		Response response = Response
				.builder()
				.message(message)
				.build();
		
		return new ResponseEntity<Response<Void>>(response, HttpStatus.CREATED);
	}
}
