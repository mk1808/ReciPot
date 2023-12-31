package pl.mk.recipot.dictionaries.services;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.domains.GetFirstOrNull;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CheckIfHashTagExists;
import pl.mk.recipot.dictionaries.dtos.HashTagFilterDto;
import pl.mk.recipot.dictionaries.repositories.IHashTagRepository;

@Service
public class HashTagsService
		implements IFilterService<HashTag, HashTagFilterDto>, ICrudService<HashTag>, IHashTagsService {
	private IHashTagRepository hashTagRepository;

	public HashTagsService(IHashTagRepository hashTagRepository) {
		super();
		this.hashTagRepository = hashTagRepository;
	}

	@Override
	public HashTag save(HashTag hashTag) {
		new CheckIfHashTagExists().execute(hashTagRepository.findByName(hashTag.getName()));
		return hashTagRepository.save(hashTag);
	}

	@Override
	public HashTag update(HashTag obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public HashTag get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Page<HashTag> filter(HashTagFilterDto filterObject) {
		return hashTagRepository.findByFilter(filterObject, filterObject.getPageable());
	}

	@Override
	public Set<HashTag> saveMany(Set<HashTag> hashtags) {
		return hashtags.stream().map(this::saveIfNotExists).collect(Collectors.toSet());
	}

	private HashTag saveIfNotExists(HashTag hashTag) {
		HashTag existingTag = new GetFirstOrNull().execute(hashTagRepository.findByName(hashTag.getName()));
		if (existingTag != null) {
			return existingTag;
		}

		hashTag.setId(null);
		return hashTagRepository.save(hashTag);
	}

}
