package pl.mk.recipot.commons.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSearchDto {

	private List<SearchCriteriaDto> searchCriteriaList;
	private String dataOption;

}
