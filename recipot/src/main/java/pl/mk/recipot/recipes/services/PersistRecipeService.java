package pl.mk.recipot.recipes.services;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.SetDateNowAndUserValue;
import pl.mk.recipot.commons.enums.ChangeType;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;
import pl.mk.recipot.dictionaries.facades.IDictionariesFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfIngredientsUnique;
import pl.mk.recipot.recipes.domains.CheckIfRecipeDoesNotExists;
import pl.mk.recipot.recipes.domains.CleanRecipe;
import pl.mk.recipot.recipes.domains.GetIngredientsDifference;
import pl.mk.recipot.recipes.domains.GetIngredientsFromRecipeIngredients;
import pl.mk.recipot.recipes.domains.UpdateExistingIngredients;
import pl.mk.recipot.recipes.domains.UpdateFieldsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateListsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeIngredientsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeSteps;
import pl.mk.recipot.recipes.repositories.IRecipeIngredientsRepository;
import pl.mk.recipot.recipes.repositories.IRecipeStepsRepository;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class PersistRecipeService {
	private IAuthFacade authFacade;
	private IDictionariesFacade dictionariesFacade;
	private IRecipesRepository recipesRepository;
	private IRecipeCollectionsFacade recipeCollectionsFacade;
	private IRecipeStepsRepository recipeStepsRepository;
	private IRecipeIngredientsRepository recipeIngredientsRepository;

	public PersistRecipeService(IAuthFacade authFacade, IDictionariesFacade dictionariesFacade,
			IRecipesRepository recipesRepository, IRecipeCollectionsFacade recipeCollectionsFacade,
			IRecipeStepsRepository recipeStepsRepository, IRecipeIngredientsRepository recipeIngredientsRepository) {
		this.authFacade = authFacade;
		this.dictionariesFacade = dictionariesFacade;
		this.recipesRepository = recipesRepository;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
		this.recipeStepsRepository = recipeStepsRepository;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
	}

	public Recipe save(Recipe recipe) {
		setDateAndOwner(recipe);
		updateListsInRecipe(recipe);

		Recipe savedRecipe = recipesRepository.save(recipe);

		saveIngredients(savedRecipe);
		createSteps(savedRecipe);

		addToUserCreatedRecipesCollection(savedRecipe);
		return new CleanRecipe().execute(savedRecipe);
	}

	public Recipe update(Recipe updatedRecipe, UUID id) {
		Recipe existingRecipe = recipesRepository.getRecipeWithOwner(id);
		validate(existingRecipe);
		updatedRecipe.setId(id);

		updateListsInRecipe(updatedRecipe);
		new UpdateFieldsInRecipe().execute(existingRecipe, updatedRecipe);

		Recipe savedRecipe = recipesRepository.save(existingRecipe);

		savedRecipe.setRecipeIngredients(updateIngredients(savedRecipe, updatedRecipe));
		updateSteps(savedRecipe, updatedRecipe);

		return new CleanRecipe().execute(savedRecipe);
	}

	private void setDateAndOwner(Recipe recipe) {
		new SetDateNowAndUserValue().execute(recipe, authFacade.getCurrentUser());
	}

	private void updateListsInRecipe(Recipe recipe) {
		Set<HashTag> tags = dictionariesFacade.saveManyHashTags(recipe.getHashTags());
		Set<Category> categories = dictionariesFacade.getCategories(recipe.getCategories());
		new UpdateListsInRecipe().execute(recipe, tags, categories);
	}

	private void saveIngredients(Recipe recipe) {
		saveNewIngredients(recipe, recipe.getRecipeIngredients());
	}

	private List<RecipeIngredient> saveNewIngredients(Recipe recipe, List<RecipeIngredient> recipeIngredients) {
		List<Ingredient> ingredients = new GetIngredientsFromRecipeIngredients().execute(recipeIngredients);
		new CheckIfIngredientsUnique().execute(ingredients);

		List<Ingredient> allIngredientsCreated = dictionariesFacade.saveManyIngredients(ingredients);
		new UpdateRecipeIngredientsInRecipe().execute(recipe, recipeIngredients, allIngredientsCreated);

		List<RecipeIngredient> savedRecipeIngredients = recipeIngredientsRepository.saveAll(recipeIngredients);
		recipe.setRecipeIngredients(savedRecipeIngredients);
		return savedRecipeIngredients;
	}

	private void createSteps(Recipe recipe) {
		List<RecipeStep> updatedSteps = new UpdateRecipeSteps().execute(recipe);
		List<RecipeStep> savedSteps = recipeStepsRepository.saveAll(updatedSteps);
		recipe.setRecipeSteps(savedSteps);
	}

	private void addToUserCreatedRecipesCollection(Recipe recipe) {
		recipeCollectionsFacade.addRecipeToUserDefaultCollection(recipe.getOwner(), DefaultRecipeCollections.CREATED,
				recipe);
	}

	private void validate(Recipe recipe) {
		new CheckIfRecipeDoesNotExists().execute(recipe);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), recipe);
	}

	private List<RecipeIngredient> updateIngredients(Recipe existingRecipe, Recipe updatedRecipe) {
		List<RecipeIngredient> existingIngredients = recipeIngredientsRepository.getByRecipe(existingRecipe);
		Map<ChangeType, List<RecipeIngredient>> ingredientsDifference = new GetIngredientsDifference()
				.execute(existingIngredients, updatedRecipe.getRecipeIngredients());

		deleteRecipeIngredients(ingredientsDifference.get(ChangeType.DELETED));
		List<RecipeIngredient> saved = saveNewIngredients(existingRecipe, ingredientsDifference.get(ChangeType.ADDED));
		saved.addAll(updateRecipeIngredients(existingIngredients, ingredientsDifference.get(ChangeType.UPDATED)));

		return saved;
	}

	private List<RecipeIngredient> updateRecipeIngredients(List<RecipeIngredient> existingIngredients,
			List<RecipeIngredient> recipeIngredientsToUpdate) {
		List<RecipeIngredient> recipeIngredientsUpdated = new UpdateExistingIngredients().execute(existingIngredients,
				recipeIngredientsToUpdate);
		return recipeIngredientsRepository.saveAll(recipeIngredientsUpdated);
	}

	private void deleteRecipeIngredients(List<RecipeIngredient> recipeIngredientsToDelete) {
		recipeIngredientsRepository.deleteAll(recipeIngredientsToDelete);
	}

	private void updateSteps(Recipe existingRecipe, Recipe updatedRecipe) {
		deleteRecipeSteps(existingRecipe);
		existingRecipe.setRecipeSteps(updatedRecipe.getRecipeSteps());
		createSteps(existingRecipe);
	}

	private void deleteRecipeSteps(Recipe existingRecipe) {
		List<RecipeStep> existingSteps = recipeStepsRepository.getByRecipe(existingRecipe);
		recipeStepsRepository.deleteAllById(existingSteps.stream().map(RecipeStep::getId).toList());
	}
}
