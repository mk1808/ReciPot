package pl.mk.recipot.dictionaries.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.websocket.server.PathParam;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

@RequestMapping("/api/dictionaries")
public interface IDictionariesController {

	@PostMapping("/categories")
	Category createCategory(@RequestBody Category category);

	@GetMapping("/categories")
	List<CategoryDto> getAllCategories();

	@PostMapping("/hashTags")
	HashTag createHashTag(@RequestBody HashTag hashTag);

	@GetMapping("/hashTags")
	Page<HashTag> getAllHashTags(@PathParam(value = "name") String name, @PathParam(value = "page") Integer page,
			@PathParam(value = "size") Integer size);
}
