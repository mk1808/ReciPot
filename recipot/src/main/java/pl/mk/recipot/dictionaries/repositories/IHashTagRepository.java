package pl.mk.recipot.dictionaries.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.dictionaries.dtos.HashTagFilterDto;

@Repository
public interface IHashTagRepository extends JpaRepository<HashTag, UUID> {
	@Query("SELECT ht FROM HashTag ht WHERE ht.name LIKE %:#{#filterObject.name}%")
	Page<HashTag> findByFilter(HashTagFilterDto filterObject, Pageable pageable);

	@Query("SELECT ht FROM HashTag ht WHERE ht.name = :name")
	List<HashTag> findByName(String name);
}
