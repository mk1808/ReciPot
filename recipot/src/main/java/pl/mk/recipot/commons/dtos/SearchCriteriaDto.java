package pl.mk.recipot.commons.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SearchCriteriaDto {

	public SearchCriteriaDto(String filterKey, String operation, Object value) {
		super();
		this.filterKey = filterKey;
		this.operation = operation;
		this.value = value;
	}

	private String filterKey;
	private Object value;
	private String operation;
	private String dataOption;

}


