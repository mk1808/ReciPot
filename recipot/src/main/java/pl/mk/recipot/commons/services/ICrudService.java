package pl.mk.recipot.commons.services;

public interface ICrudService {
	<T> T save(T obj);
	<T> T update(T obj, Long id);
	<T> T get(Long id);
	<T> void delete(Long id);
	
}
