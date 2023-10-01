package pl.mk.recipot.recipes.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.dtos.RecipeSearchDto;
import pl.mk.recipot.commons.enums.PredefinedRecipeFilter;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.opinions.facades.IOpinionsFacade;
import pl.mk.recipot.privatenotes.facades.IPrivateNotesFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfRecipeDoesNotExists;
import pl.mk.recipot.recipes.domains.CleanRecipe;
import pl.mk.recipot.recipes.domains.GetPageForSearching;
import pl.mk.recipot.recipes.domains.GetRandomRecipes;
import pl.mk.recipot.recipes.domains.SearchRecipesByCriteria;
import pl.mk.recipot.recipes.domains.UpdateAverageRatingInRecipe;
import pl.mk.recipot.recipes.domains.UpdateStepsAndIngredientsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateVisibilityInRecipe;
import pl.mk.recipot.recipes.repositories.IRecipeIngredientsRepository;
import pl.mk.recipot.recipes.repositories.IRecipeStepsRepository;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class RecipesService implements IRecipesService, ICrudService<Recipe>, IFilterService<Recipe, RecipeSearchDto> {

	private IRecipesRepository recipesRepository;
	private IRecipeIngredientsRepository recipeIngredientsRepository;
	private IAuthFacade authFacade;
	private IRecipeStepsRepository recipeStepsRepository;
	private PersistRecipeService persistRecipeService;
	private DeleteRecipeService deleteRecipeService;


	public RecipesService(IRecipesRepository recipesRepository, IAuthFacade authFacade,
			IRecipeIngredientsRepository recipeIngredientsRepository, IRecipeStepsRepository recipeStepsRepository,
			PersistRecipeService persistRecipeService, DeleteRecipeService deleteRecipeService) {
		super();
		this.recipesRepository = recipesRepository;
		this.authFacade = authFacade;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
		this.recipeStepsRepository = recipeStepsRepository;
		this.persistRecipeService = persistRecipeService;
		this.deleteRecipeService = deleteRecipeService;
		
	}

	@Override
	public Page<Recipe> filter(RecipeSearchDto recipeSearchDto) {
		Specification<Recipe> specification = new SearchRecipesByCriteria().execute(recipeSearchDto);
		Pageable page = new GetPageForSearching().execute(recipeSearchDto);
		return recipesRepository.findAll(specification, page);
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
		return recipe;
	}

	@Override
	public Recipe getCleanedRecipe(UUID id) {
		Recipe recipe = get(id);
		return new UpdateStepsAndIngredientsInRecipe().execute(recipe,
				new CleanRecipe().executeIngredients(recipeIngredientsRepository.getByRecipe(recipe)),
				new CleanRecipe().executeSteps(recipeStepsRepository.getByRecipe(recipe)));
	}

	@Override
	@Transactional
	public void delete(UUID id) {
		Recipe existingRecipe = get(id);
		deleteRecipeService.delete(existingRecipe);
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

	@Override
	public Page<Recipe> getByPredefinedFilter(PredefinedRecipeFilter type, int pageNum, int pageSize) {
		RecipeSearchDto recipeSearchDto = type.getFilter().setPage(pageNum).setSize(pageSize);
		Specification<Recipe> specification = new SearchRecipesByCriteria().execute(recipeSearchDto);
		Pageable page = new GetPageForSearching().execute(recipeSearchDto);
		return recipesRepository.findAll(specification, page);
	}

	@Override
	public List<Recipe> getRandomRecipes(int pageSize) {
		return new GetRandomRecipes().execute(getByPredefinedFilter(PredefinedRecipeFilter.NEWEST, 0, 10000), pageSize);
	}
	
	@Override
	public AppUser getRecipeOwner(UUID recipeId) {
		return get(recipeId).getOwner();
	}
}
