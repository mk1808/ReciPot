package pl.mk.recipot.files.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.File;

@RequestMapping("/api/files")
public interface IFilesController {

	@PostMapping
	ResponseEntity<Response<File>> uploadFile(@RequestParam("file") MultipartFile file);

	@GetMapping("/{id}")
	ResponseEntity<byte[]> getFile(@PathVariable UUID id);

}
