package pl.mk.recipot.dictionaries.dtos;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class IngredientsFilterDto {
	public int page = 0;
	public int size = 1000;

	public String name = "";

	public Pageable getPageable() {
		return PageRequest.of(page, size);
	}

	public IngredientsFilterDto setPage(Integer page) {
		if (page != null) {
			this.page = page;
		}
		return this;
	}

	public IngredientsFilterDto setSize(Integer size) {
		if (size != null) {
			this.size = size;
		}
		return this;
	}

	public IngredientsFilterDto setName(String name) {
		if (name != null) {
			this.name = name;
		}
		return this;
	}
}
