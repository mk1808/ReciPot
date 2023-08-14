package pl.mk.recipot.commons.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchOrderDto {
	public String fieldName;
	public String order;

}
