package pl.mk.recipot.commons.factories;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import pl.mk.recipot.commons.dtos.Response;

public class OkFileResponseFactory implements IFileResponseFactory {

	@Override
	public <T> ResponseEntity<T> createResponse(T value, String name) {
		Response response = Response
				.builder()
				.value(value)
				.build();
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + name + "\"");

		return new ResponseEntity<T>(value, headers, HttpStatus.OK);
	}

}
