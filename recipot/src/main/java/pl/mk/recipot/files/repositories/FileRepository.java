package pl.mk.recipot.files.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.File;

@Repository
public interface FileRepository extends JpaRepository<File, UUID> {

}