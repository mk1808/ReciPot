package pl.mk.recipot.dictionaries.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.dtos.IngredientsFilterDto;
import pl.mk.recipot.dictionaries.repositories.IIngredientsRepository;

@Service
public class IngredientsService implements IFilterService<Ingredient, IngredientsFilterDto>, ICrudService<Ingredient> {
	private IIngredientsRepository ingredientsRepository;

	public IngredientsService(IIngredientsRepository ingredientRepository) {
		super();
		this.ingredientsRepository = ingredientRepository;
	}

	@Override
	public Ingredient save(Ingredient Ingredient) {
		return ingredientsRepository.save(Ingredient);
	}

	@Override
	public Ingredient update(Ingredient obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Ingredient get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Page<Ingredient> filter(IngredientsFilterDto filterObject) {
		return ingredientsRepository.findByFilter(filterObject, filterObject.getPageable());
	}

}
