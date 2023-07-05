package pl.mk.recipot.recipes.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.enums.ChangeType;
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
import pl.mk.recipot.recipes.domains.FillOtherRecipeFields;
import pl.mk.recipot.recipes.domains.FillRecipeWithIngredients;
import pl.mk.recipot.recipes.domains.GetIngredientsDifference;
import pl.mk.recipot.recipes.domains.GetIngredientsFromRecipe;
import pl.mk.recipot.recipes.domains.GetRecipeIngredientNameList;
import pl.mk.recipot.recipes.domains.ToggleRecipeVisibility;
import pl.mk.recipot.recipes.domains.UpdateExistingIngredients;
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

		List<Ingredient> ingredients = new GetIngredientsFromRecipe().execute(recipe);
		List<RecipeIngredient> savedRecipeIngredients = saveIngredients(savedRecipe, recipe, ingredients);
		savedRecipe.setRecipeIngredients(
			new CleanRecipe().executeIngredients(savedRecipeIngredients));

		
		List<RecipeStep> allStepsCreated = createSteps(recipe, savedRecipe);
		savedRecipe.setRecipeSteps(new CleanRecipe().executeSteps(allStepsCreated));
		return savedRecipe;
	}

	private List<RecipeStep> createSteps(Recipe recipe, Recipe savedRecipe) {
		List<RecipeStep> updatedSteps = new UpdateRecipeStepsForRecipe().execute(savedRecipe, recipe.getRecipeSteps());
		return recipeStepsRepository.saveAll(updatedSteps);
	}

	private List<RecipeIngredient> saveIngredients(Recipe savedRecipe, Recipe newRecipe, List<Ingredient> ingredients) {
		List<Ingredient> allIngredientsCreated = dictionariesFacade.saveManyIngredients(ingredients);
		List<RecipeIngredient> recipeIngredients = new UpdateRecipeIngredientsForRecipe().execute(savedRecipe,
				newRecipe, allIngredientsCreated);
		return recipeIngredientsRepository.saveAll(recipeIngredients);
	}

	@Override
	public Recipe update(Recipe recipe, UUID id) {
		Recipe existingRecipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeExists().execute(existingRecipe);
		new CheckIfUserIsOwner().execute(authFacade.getCurrentUser(), existingRecipe);
		Recipe createdRecipe = recipesRepository.save(new FillOtherRecipeFields().execute(existingRecipe, recipe));

		Map<ChangeType, List<Ingredient>> ingredientsDifference = new GetIngredientsDifference().execute(existingRecipe,recipe);
		List<RecipeIngredient> savedRecipeIngredients = 
				saveIngredients(existingRecipe,recipe, ingredientsDifference.get(ChangeType.ADDED));

		List<String> namesList = new GetRecipeIngredientNameList().execute(ingredientsDifference.get(ChangeType.UPDATED));
		List<RecipeIngredient> recipeIngredientsToUpdate = recipeIngredientsRepository.getByRecipeAndIngredients(id, namesList);
		List<RecipeIngredient> recipeIngredientsUpdated = new UpdateExistingIngredients().execute(recipeIngredientsToUpdate, 
				new ArrayList<>(recipe.getRecipeIngredients()), recipe);
		List<RecipeIngredient> savedUpdatedRecipeIngredients = recipeIngredientsRepository.saveAll(recipeIngredientsUpdated);

		List<String> namesListDeleted = new GetRecipeIngredientNameList().execute(ingredientsDifference.get(ChangeType.DELETED));
		List<RecipeIngredient> recipeIngredientsToDelete = recipeIngredientsRepository.getByRecipeAndIngredients(id, namesListDeleted);
		recipeIngredientsRepository.deleteAll(recipeIngredientsToDelete);

		deleteRecipeSteps(recipeStepsRepository.getByRecipe(existingRecipe));
		List<RecipeStep> allStepsCreated = createSteps(recipe, existingRecipe);

		createdRecipe.setRecipeSteps(new CleanRecipe().executeSteps(allStepsCreated));
		createdRecipe = new FillRecipeWithIngredients().execute(createdRecipe, savedRecipeIngredients,
				savedUpdatedRecipeIngredients);

		return createdRecipe;
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

	private void deleteRecipeSteps(List<RecipeStep> steps) {
		steps.stream().forEach(step -> recipeStepsRepository.delete(step));
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

	@Override
	public int getUserRecipesCount(AppUser user) {
		return recipesRepository.getUserRecipesCount(user);
	}

}
