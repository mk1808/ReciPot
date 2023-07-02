package pl.mk.recipot.dictionaries.facades;

import java.util.Set;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.dictionaries.services.ICategoryService;
import pl.mk.recipot.dictionaries.services.IHashTagsService;

@Service
public class DictionariesFacade implements IDictionariesFacade {
	
	private ICrudService<HashTag> hashTagCrudService;
	private IHashTagsService hashTagsService;
	private ICategoryService categoryService;

	public DictionariesFacade(ICrudService<HashTag> hashTagCrudService, IHashTagsService hashTagsService, ICategoryService categoryService) {
		super();
		this.hashTagCrudService = hashTagCrudService;
		this.hashTagsService = hashTagsService;
		this.categoryService = categoryService;

	}

	@Override
	public Set<HashTag> saveManyHashTags(Set<HashTag> hashtags) {
		return hashTagsService.saveMany(hashtags);
	}

	@Override
	public Set<Category> getCategories(Set<Category> categories) {
		return categoryService.getCategories(categories);
	}
	
	
	

}
