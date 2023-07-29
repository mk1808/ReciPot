package pl.mk.recipot.dictionaries.services;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.domains.CheckIfIngredientExists;
import pl.mk.recipot.dictionaries.domains.GetHashTagIfExists;
import pl.mk.recipot.dictionaries.domains.GetIngredientIfExists;
import pl.mk.recipot.dictionaries.dtos.IngredientsFilterDto;
import pl.mk.recipot.dictionaries.repositories.IIngredientsRepository;

@Service
public class IngredientsService implements IFilterService<Ingredient, IngredientsFilterDto>, ICrudService<Ingredient>, IIngredientsService {
	private IIngredientsRepository ingredientsRepository;

	public IngredientsService(IIngredientsRepository ingredientRepository) {
		super();
		this.ingredientsRepository = ingredientRepository;
	}

	@Override
	public Ingredient save(Ingredient Ingredient) {
		new CheckIfIngredientExists().execute(ingredientsRepository.findByName(Ingredient.getName()));
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
	
	@Override
	public List<Ingredient> saveMany(List<Ingredient> ingredients) {
		return ingredients.stream().map(this::saveIfNotExists).collect(Collectors.toList());
	}
	
	private Ingredient saveIfNotExists(Ingredient ingredient) {
		Ingredient exisitingIngredient = getIngredientByName(ingredient);
		if (exisitingIngredient != null) {
			return exisitingIngredient;
		}
		ingredient.setId(null);
		return ingredientsRepository.save(ingredient);
	}

	private Ingredient getIngredientByName(Ingredient ingredient) {
		return new GetIngredientIfExists().execute(ingredientsRepository.findByName(ingredient.getName()));
	
	}

}
