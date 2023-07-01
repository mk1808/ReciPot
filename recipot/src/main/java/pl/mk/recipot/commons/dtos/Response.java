package pl.mk.recipot.commons.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Response<T> {
	private String message;
	private String details;
	private T value;

}
