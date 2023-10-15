package pl.mk.recipot.files.domains;

import java.io.IOException;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pl.mk.recipot.commons.exceptions.BadRequestException;
import pl.mk.recipot.commons.models.File;

public class CreateFile {
	public File execute(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			return File.builder()
					.name(fileName)
					.type(file.getContentType())
					.data(file.getBytes())
					.build();
		} catch (IOException e) {
			throw new BadRequestException("files.error.incorrectFile");
		}
	}
}
