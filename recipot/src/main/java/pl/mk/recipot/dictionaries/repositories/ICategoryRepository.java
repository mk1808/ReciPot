package pl.mk.recipot.dictionaries.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.Category;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, UUID> {

}
