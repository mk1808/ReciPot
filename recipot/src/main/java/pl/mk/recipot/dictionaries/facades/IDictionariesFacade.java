package pl.mk.recipot.dictionaries.facades;

import java.util.List;
import java.util.Set;

import pl.mk.recipot.commons.models.HashTag;

public interface IDictionariesFacade {
	
	Set<HashTag> saveMany(Set<HashTag> tags);

}
