package pl.mk.recipot.commons.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchCriteriaDto {
	private String filterKey;
    private Object value;
    private String operation;
    private String dataOption;

}
