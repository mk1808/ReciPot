package pl.mk.recipot.files.controllers;

import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.File;
import pl.mk.recipot.files.services.IFilesService;

@RestController
public class FilesController implements IFilesController {

	private IFilesService filesService;

	public FilesController(IFilesService filesService) {
		super();
		this.filesService = filesService;
	}

	public ResponseEntity<Response<File>> uploadFile(MultipartFile file) {
		return new CreatedResponseFactory().createResponse(filesService.save(file));
	}

	public ResponseEntity<byte[]> getFile(UUID id) {
		File file = filesService.get(id);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
				.body(file.getData());
	}

}
