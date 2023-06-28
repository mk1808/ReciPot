package pl.mk.recipot.commons.services;

public interface ICrudService<T> {
	T save(T obj);
	T update(T obj, Long id);
	T get(Long id);
	void delete(Long id);
	
}
