package pl.mk.recipot.commons.factories;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public class NotImplementedResponseFactory implements IErrorResponseFactory {

	@Override
	public ResponseEntity<Response<Void>> createResponse(String message, String details) {
		Response response = Response
				.builder()
				.message(message)
				.details(details)
				.build();
		
		return new ResponseEntity<Response<Void>>(response, HttpStatus.NOT_IMPLEMENTED);

	}
}
