package pl.mk.recipot.dictionaries.facades;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;

public interface IDictionariesFacade {
	
	Set<HashTag> saveManyHashTags(Set<HashTag> tags);

	Set<Category> getCategories(Set<Category> categories);

}
