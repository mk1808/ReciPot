package pl.mk.recipot.dictionaries.domains;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.dictionaries.dtos.CategoryDto;

public class CreateHierarchicalCategoriesList {
	private Map<UUID, CategoryDto> mappedCategories = new HashMap<>();

	public List<CategoryDto> execute(List<Category> categories) {
		mappCategories(categories);
		return groupCategories();
	}

	private void mappCategories(List<Category> categories) {
		categories.forEach(this::mapCategory);
	}

	private void mapCategory(Category category) {
		Category parentCategory = category.getParentCategory();
		UUID parentCategoryId = null;
		if (parentCategory != null) {
			parentCategoryId = parentCategory.getId();
		}
		mappedCategories.put(
				category.getId(), 
				CategoryDto.builder()
				.id(category.getId())
				.image(category.getImage())
				.name(category.getName())
				.parentCategory(parentCategoryId)
				.children(new ArrayList<>())
				.build());
	}

	private List<CategoryDto> groupCategories() {
		List<CategoryDto> categories = new ArrayList<>();
		mappedCategories.values().forEach(category -> {
			if (category.getParentCategory() == null) {
				categories.add(category);
			} else {
				mappedCategories.get(category.getParentCategory()).getChildren().add(category);
			}
		});
		return categories;
	}
}
