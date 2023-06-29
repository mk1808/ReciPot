package pl.mk.recipot.dictionaries.dtos;

import java.util.List;
import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDto {
	private UUID id;

	private String name;
	private String image;
	private UUID parentCategory;
	private List<CategoryDto> children;
}
