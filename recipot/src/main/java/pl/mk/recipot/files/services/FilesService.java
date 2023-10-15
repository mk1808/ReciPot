package pl.mk.recipot.files.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import pl.mk.recipot.commons.models.File;
import pl.mk.recipot.files.domains.CheckIfFileDoesNotExist;
import pl.mk.recipot.files.domains.CreateFile;
import pl.mk.recipot.files.repositories.IFilesRepository;

@Service
public class FilesService implements IFilesService {

	private IFilesRepository filesRepository;

	public FilesService(IFilesRepository filesRepository) {
		super();
		this.filesRepository = filesRepository;
	}

	@Override
	public File get(UUID id) {
		File existingFile = filesRepository.findById(id).get();
		new CheckIfFileDoesNotExist().execute(existingFile);
		return existingFile;
	}

	@Override
	public File save(MultipartFile file) {
		File createdFile = new CreateFile().execute(file);
		return filesRepository.save(createdFile);
	}

}