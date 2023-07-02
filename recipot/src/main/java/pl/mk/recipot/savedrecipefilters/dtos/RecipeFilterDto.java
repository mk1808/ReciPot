package pl.mk.recipot.savedrecipefilters.dtos;

import java.util.Date;
import java.util.UUID;

public class RecipeFilterDto {
	public UUID id;
	public String name;
	public String value;
	public Date created;

	public RecipeFilterDto(UUID id, String name, String value, Date created) {
		super();
		this.id = id;
		this.name = name;
		this.value = value;
		this.created = created;
	}

}
