package pl.mk.recipot.commons.services;

import org.springframework.data.domain.Page;

public interface IFilterService<T, V> {
	Page<T> filter(V filterObject, int pageSize, int pageNum);
}
