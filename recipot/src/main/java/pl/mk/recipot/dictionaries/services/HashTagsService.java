package pl.mk.recipot.dictionaries.services;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.HashTagFilterDto;
import pl.mk.recipot.dictionaries.repositories.IHashTagRepository;

@Service
public class HashTagsService implements IFilterService<HashTag, HashTagFilterDto>, ICrudService<HashTag> {
	private IHashTagRepository hashTagRepository;

	public HashTagsService(IHashTagRepository hashTagRepository) {
		super();
		this.hashTagRepository = hashTagRepository;
	}

	@Override
	public HashTag save(HashTag hashTag) {
		return hashTagRepository.save(hashTag);
	}

	@Override
	public HashTag update(HashTag obj, Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public HashTag get(Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(Long id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Page<HashTag> filter(HashTagFilterDto filterObject) {
		return hashTagRepository.findByFilter(filterObject, filterObject.getPageable());
	}

}
