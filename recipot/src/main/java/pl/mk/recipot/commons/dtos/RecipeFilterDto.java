package pl.mk.recipot.commons.dtos;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class RecipeFilterDto {
	
	public int page = 0;
	public int size = 1000;
	public List<SearchCriteriaDto> searchCriteriaList;
	public Pageable getPageable() {
		return PageRequest.of(page, size);
	}

	public RecipeFilterDto setPage(Integer page) {
		if (page != null) {
			this.page = page;
		}
		return this;
	}

	public RecipeFilterDto setSize(Integer size) {
		if (size != null) {
			this.size = size;
		}
		return this;
	}

}
