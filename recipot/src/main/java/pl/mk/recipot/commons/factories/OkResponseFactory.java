package pl.mk.recipot.commons.factories;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public class OkResponseFactory implements IValueResponseFactory  {

	@Override
	public <T> ResponseEntity<Response<T>> createResponse(T value) {
		Response response = Response
				.builder()
				.value(value)
				.build();
		
		return new ResponseEntity<Response<T>>(response, HttpStatus.OK);

	}
	/*
	@Override
	public ResponseEntity<Response<Void>> createResponse(String message, String details) {
		Response response = Response
				.builder()
				.message(message)
				.details(details)
				.build();
		
		return new ResponseEntity<Response<Void>>(response, HttpStatus.OK);

	}
		
	@Override
	public ResponseEntity<Response<Void>> createMessageResponse(String message) {
		Response response = Response
				.builder()
				.message(message)
				.build();
		
		return new ResponseEntity<Response<Void>>(response, HttpStatus.OK);

	}


@Override
public <T> ResponseEntity<Response<T>> createResponse(Object... args) {
	// TODO Auto-generated method stub
	return null;
}*/

}
