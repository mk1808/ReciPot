package pl.mk.recipot.dictionaries.facades;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.dictionaries.services.IHashTagsService;

@Service
public class DictionariesFacade implements IDictionariesFacade {
	
	private ICrudService<HashTag> hashTagCrudService;
	private IHashTagsService hashTagsService;

	public DictionariesFacade(ICrudService<HashTag> hashTagCrudService, IHashTagsService hashTagsService) {
		super();
		this.hashTagCrudService = hashTagCrudService;
		this.hashTagsService = hashTagsService;

	}

	@Override
	public Set<HashTag> saveMany(Set<HashTag> hashtags) {
		return hashTagsService.saveMany(hashtags);
	}
	
	
	

}
