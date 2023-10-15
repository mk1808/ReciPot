package pl.mk.recipot.files.services;

import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import pl.mk.recipot.commons.models.File;

public interface IFilesService {
	
	 public File save(MultipartFile file);
	 public File get(UUID id);

}
