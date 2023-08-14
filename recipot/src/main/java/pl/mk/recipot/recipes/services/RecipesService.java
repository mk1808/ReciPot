package pl.mk.recipot.recipes.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.recipes.domains.CheckIfRecipeDoesNotExists;
import pl.mk.recipot.recipes.domains.CleanRecipe;
import pl.mk.recipot.recipes.domains.UpdateAverageRatingInRecipe;
import pl.mk.recipot.recipes.domains.UpdateStepsAndIngredientsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateVisibilityInRecipe;
import pl.mk.recipot.recipes.dtos.RecipeFilterDto;
import pl.mk.recipot.recipes.repositories.IRecipeIngredientsRepository;
import pl.mk.recipot.recipes.repositories.IRecipeStepsRepository;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class RecipesService implements IRecipesService, ICrudService<Recipe>, IFilterService<Recipe, RecipeFilterDto> {

	private IRecipesRepository recipesRepository;
	private IRecipeIngredientsRepository recipeIngredientsRepository;
	private IAuthFacade authFacade;
	private IRecipeStepsRepository recipeStepsRepository;
	private PersistRecipeService persistRecipeService;

	public RecipesService(IRecipesRepository recipesRepository, IAuthFacade authFacade,
			IRecipeIngredientsRepository recipeIngredientsRepository, IRecipeStepsRepository recipeStepsRepository,
			PersistRecipeService persistRecipeService) {
		super();
		this.recipesRepository = recipesRepository;
		this.authFacade = authFacade;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
		this.recipeStepsRepository = recipeStepsRepository;
		this.persistRecipeService = persistRecipeService;
	}

	@Override
	public Page<Recipe> filter(RecipeFilterDto filterObject) {
		throw new UnsupportedOperationException();
	}
	
	public Page<Recipe> findBySearchCriteria(Specification<Recipe> spec, Pageable page) {
		Page<Recipe> recipes = recipesRepository.findAll(spec, page);
	/*
		recipes.forEach(x->x.getCategories().forEach(p->p.setParentCategory(null)));
		recipes.forEach(x->x.getCategories().forEach(p->p.setName(null)));
		recipes.forEach(x->x.getCategories().forEach(p->p.setImage(null)));

		recipes.forEach(x->x.getCategories().forEach(p->p.setId(null)));
		*/
		//recipes.forEach(x->x.setCategories(null));
		
		return recipes;
	}

	@Override
	public Recipe save(Recipe recipe) {
		return persistRecipeService.save(recipe);
	}

	@Override
	public Recipe update(Recipe recipe, UUID id) {
		return persistRecipeService.update(recipe, id);
	}

	@Override
	public Recipe get(UUID id) {
		Recipe recipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeDoesNotExists().execute(recipe);
		return new UpdateStepsAndIngredientsInRecipe().execute(recipe,
				new CleanRecipe().executeIngredients(recipeIngredientsRepository.getByRecipe(recipe)),
				new CleanRecipe().executeSteps(recipeStepsRepository.getByRecipe(recipe)));
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void changeVisibility(UUID recipeId) {
		Recipe savedRecipe = get(recipeId);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), savedRecipe);
		new UpdateVisibilityInRecipe().execute(savedRecipe);
		recipesRepository.save(savedRecipe);
	}

	@Override
	public int getAllRecipesCount() {
		return recipesRepository.getAllRecipesCount();
	}

	@Override
	public int getUserRecipesCount(AppUser user) {
		return recipesRepository.getUserRecipesCount(user);
	}

	@Override
	public Recipe updateRecipeAverageRating(Recipe updatedRecipe) {
		Recipe existingRecipe = get(updatedRecipe.getId());
		return recipesRepository.save(new UpdateAverageRatingInRecipe().execute(existingRecipe, updatedRecipe));
	}

}
