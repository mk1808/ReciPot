package pl.mk.recipot.recipes.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.facades.IDictionariesFacade;

import pl.mk.recipot.recipes.domains.CheckIfUserIsOwner;
import pl.mk.recipot.dictionaries.repositories.IHashTagRepository;
import pl.mk.recipot.recipes.domains.UpdateRecipeIngredientsForRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeStepsForRecipe;
import pl.mk.recipot.recipes.domains.UpdateUserInRecipe;
import pl.mk.recipot.recipes.domains.CheckIfRecipeExists;
import pl.mk.recipot.recipes.domains.CheckIfUserIsOwner;
import pl.mk.recipot.recipes.domains.CleanRecipe;
import pl.mk.recipot.recipes.domains.GetIngredientsDifference;
import pl.mk.recipot.recipes.domains.GetIngredientsFromRecipe;
import pl.mk.recipot.recipes.domains.ToggleRecipeVisibility;
import pl.mk.recipot.recipes.domains.UpdateListsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeIngredientsForRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeStepsForRecipe;
import pl.mk.recipot.recipes.domains.UpdateUserInRecipe;
import pl.mk.recipot.recipes.dtos.RecipeFilterDto;
import pl.mk.recipot.recipes.repositories.IRecipeIngredientsRepository;
import pl.mk.recipot.recipes.repositories.IRecipeStepsRepository;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class RecipesService implements IRecipesService, ICrudService<Recipe>, IFilterService<Recipe, RecipeFilterDto> {

	private IRecipesRepository recipesRepository;
	private IRecipeIngredientsRepository recipeIngredientsRepository;
	private IDictionariesFacade dictionariesFacade;
	private IAuthFacade authFacade;
	private IRecipeStepsRepository recipeStepsRepository;

	public RecipesService(IRecipesRepository recipesRepository, IDictionariesFacade dictionariesFacade,
			IAuthFacade authFacade, IRecipeIngredientsRepository recipeIngredientsRepository,
			IRecipeStepsRepository recipeStepsRepository) {
		super();
		this.recipesRepository = recipesRepository;
		this.dictionariesFacade = dictionariesFacade;
		this.authFacade = authFacade;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
		this.recipeStepsRepository = recipeStepsRepository;
	}

	@Override
	public Page<Recipe> filter(RecipeFilterDto filterObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recipe save(Recipe recipe) {
		recipe = new UpdateUserInRecipe().execute(recipe, authFacade.getCurrentUser());

		Set<HashTag> tags = dictionariesFacade.saveManyHashTags(recipe.getHashTags());
		Set<Category> categories = dictionariesFacade.getCategories(recipe.getCategories());
		Recipe updatedRecipe = new UpdateListsInRecipe().execute(recipe, tags, categories);
		Recipe savedRecipe = recipesRepository.save(updatedRecipe);

		Set<Ingredient> ingredients = new GetIngredientsFromRecipe().execute(recipe);
		Set<Ingredient> allIngredientsCreated = dictionariesFacade.saveManyIngredients(ingredients);
		Set<RecipeIngredient> recipeIngredients = new UpdateRecipeIngredientsForRecipe().execute(savedRecipe,
				allIngredientsCreated);
		List<RecipeIngredient> savedRecipeIngredients = recipeIngredientsRepository.saveAll(recipeIngredients);
		savedRecipe.setRecipeIngredients(
				new CleanRecipe().executeIngredients(new HashSet<RecipeIngredient>(savedRecipeIngredients)));

		Set<RecipeStep> updatedSteps = new UpdateRecipeStepsForRecipe().execute(savedRecipe, recipe.getRecipeSteps());
		Set<RecipeStep> allStepsCreated = saveRecipeSteps(updatedSteps);
		savedRecipe.setRecipeSteps(new CleanRecipe().executeSteps(allStepsCreated));

		return savedRecipe;
	}

	@Override
	public Recipe update(Recipe recipe, UUID id) {
		Recipe existingRecipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeExists().execute(existingRecipe);
		new CheckIfUserIsOwner().execute(authFacade.getCurrentUser(), existingRecipe);
		
		new GetIngredientsDifference().execute(existingRecipe,recipe);
		return null;
	}

	@Override
	public Recipe get(UUID id) {
		Recipe recipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeExists().execute(recipe);
		return recipe;
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub

	}

	private Set<RecipeStep> saveRecipeSteps(Set<RecipeStep> steps) {
		return steps.stream().map(step -> recipeStepsRepository.save(step)).collect(Collectors.toSet());
	}

	@Override
	public void changeVisibility(UUID recipeId) {
		Recipe savedRecipe = get(recipeId);
		new CheckIfUserIsOwner().execute(authFacade.getCurrentUser(), savedRecipe);
		new ToggleRecipeVisibility().execute(savedRecipe);
		recipesRepository.save(savedRecipe);
	}

	@Override
	public int getAllRecipesCount() {
		return recipesRepository.getAllRecipesCount();
	}

}
