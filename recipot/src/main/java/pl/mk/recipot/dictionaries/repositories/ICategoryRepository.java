package pl.mk.recipot.dictionaries.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Category;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, UUID> {
	@Query("SELECT c FROM Category c WHERE c.name = :name")
	List<Category> findByName(String name);
}
