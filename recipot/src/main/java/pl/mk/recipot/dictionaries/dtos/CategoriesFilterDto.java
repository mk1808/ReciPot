package pl.mk.recipot.dictionaries.dtos;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class CategoriesFilterDto {
	public int page = 0;
	public int size = 1000;

	public Pageable getPageable() {
		return PageRequest.of(page, size);
	}

	public CategoriesFilterDto setPage(Integer page) {
		if (page != null) {
			this.page = page;
		}
		return this;
	}

	public CategoriesFilterDto setSize(Integer size) {
		if (size != null) {
			this.size = size;
		}
		return this;
	}
}
