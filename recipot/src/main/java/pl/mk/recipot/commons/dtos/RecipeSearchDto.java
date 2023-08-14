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
	private SearchOrderDto searchOrderDto;
	public int page = 0;
	public int size = 1000;

	public RecipeSearchDto setPage(Integer page) {
		if (page != null) {
			this.page = page;
		}
		return this;
	}

	public RecipeSearchDto setSize(Integer size) {
		if (size != null) {
			this.size = size;
		}
		return this;
	}

}