package pl.mk.recipot.recipes.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.SetDateNow;
import pl.mk.recipot.commons.domains.SetDateNowAndUserValue;
import pl.mk.recipot.commons.enums.ChangeType;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Category;
import pl.mk.recipot.commons.models.HashTag;
import pl.mk.recipot.commons.models.Ingredient;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.RecipeIngredient;
import pl.mk.recipot.commons.models.RecipeStep;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.commons.services.IFilterService;
import pl.mk.recipot.dictionaries.facades.IDictionariesFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfIngredientsUnique;
import pl.mk.recipot.recipes.domains.CheckIfRecipeDoesNotExists;
import pl.mk.recipot.recipes.domains.CleanRecipe;
import pl.mk.recipot.recipes.domains.GetIngredientsDifference;
import pl.mk.recipot.recipes.domains.GetIngredientsFromRecipe;
import pl.mk.recipot.recipes.domains.GetRecipeIngredientsNames;
import pl.mk.recipot.recipes.domains.UpdateAverageRatingInRecipe;
import pl.mk.recipot.recipes.domains.UpdateExistingIngredients;
import pl.mk.recipot.recipes.domains.UpdateIngredientsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateListsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateOtherFieldsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeIngredientsInRecipe;
import pl.mk.recipot.recipes.domains.UpdateRecipeSteps;
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
	private IDictionariesFacade dictionariesFacade;
	private IAuthFacade authFacade;
	private IRecipeStepsRepository recipeStepsRepository;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public RecipesService(IRecipesRepository recipesRepository, IDictionariesFacade dictionariesFacade,
			IAuthFacade authFacade, IRecipeIngredientsRepository recipeIngredientsRepository,
			IRecipeStepsRepository recipeStepsRepository, @Lazy IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.recipesRepository = recipesRepository;
		this.dictionariesFacade = dictionariesFacade;
		this.authFacade = authFacade;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
		this.recipeStepsRepository = recipeStepsRepository;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
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
		recipe = new SetDateNowAndUserValue().execute(recipe, authFacade.getCurrentUser());

		Set<HashTag> tags = dictionariesFacade.saveManyHashTags(recipe.getHashTags());
		Set<Category> categories = dictionariesFacade.getCategories(recipe.getCategories());
		Recipe updatedRecipe = new UpdateListsInRecipe().execute(recipe, tags, categories);
		Recipe savedRecipe = recipesRepository.save(updatedRecipe);

		List<Ingredient> ingredients = new GetIngredientsFromRecipe().execute(recipe);
		List<RecipeIngredient> savedRecipeIngredients = saveIngredients(savedRecipe, recipe, ingredients);
		List<RecipeStep> allStepsCreated = createSteps(recipe, savedRecipe);
		recipeCollectionsFacade.addRecipeToUserDefaultCollection(authFacade.getCurrentUser(),
				DefaultRecipeCollections.CREATED, savedRecipe);
		return cleanRecipe(savedRecipe, savedRecipeIngredients, allStepsCreated);
	}

	@Override
	public Recipe update(Recipe recipe, UUID id) {
		Recipe existingRecipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeDoesNotExists().execute(existingRecipe);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), existingRecipe);

		Set<HashTag> tags = dictionariesFacade.saveManyHashTags(recipe.getHashTags());
		Set<Category> categories = dictionariesFacade.getCategories(recipe.getCategories());
		existingRecipe = new UpdateListsInRecipe().execute(existingRecipe, tags, categories);
		Recipe createdRecipe = recipesRepository.save(new UpdateOtherFieldsInRecipe().execute(existingRecipe, recipe));

		Map<ChangeType, List<Ingredient>> ingredientsDifference = new GetIngredientsDifference().execute(existingRecipe,
				recipe);
		List<RecipeIngredient> savedRecipeIngredients = saveIngredients(existingRecipe, recipe,
				ingredientsDifference.get(ChangeType.ADDED));

		List<String> namesList = new GetRecipeIngredientsNames().execute(ingredientsDifference.get(ChangeType.UPDATED));
		List<RecipeIngredient> recipeIngredientsToUpdate = recipeIngredientsRepository.getByRecipeAndIngredients(id,
				namesList);
		List<RecipeIngredient> recipeIngredientsUpdated = new UpdateExistingIngredients()
				.execute(recipeIngredientsToUpdate, new ArrayList<>(recipe.getRecipeIngredients()), recipe);
		List<RecipeIngredient> savedUpdatedRecipeIngredients = recipeIngredientsRepository
				.saveAll(recipeIngredientsUpdated);

		List<String> namesListDeleted = new GetRecipeIngredientsNames()
				.execute(ingredientsDifference.get(ChangeType.DELETED));
		List<RecipeIngredient> recipeIngredientsToDelete = recipeIngredientsRepository.getByRecipeAndIngredients(id,
				namesListDeleted);
		recipeIngredientsRepository.deleteAll(recipeIngredientsToDelete);

		deleteRecipeSteps(recipeStepsRepository.getByRecipe(existingRecipe));
		List<RecipeStep> allStepsCreated = createSteps(recipe, existingRecipe);

		createdRecipe.setRecipeSteps(new CleanRecipe().executeSteps(allStepsCreated));
		createdRecipe = new UpdateIngredientsInRecipe().execute(createdRecipe, savedRecipeIngredients,
				savedUpdatedRecipeIngredients);

		return createdRecipe;
	}

	@Override
	public Recipe get(UUID id) {
		Recipe recipe = recipesRepository.getRecipeWithOwner(id);
		new CheckIfRecipeDoesNotExists().execute(recipe);
		return new UpdateStepsAndIngredientsInRecipe().execute(recipe,
				new CleanRecipe().executeIngredients(recipeIngredientsRepository.getByRecipeId(recipe.getId())),
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
	
	private List<RecipeStep> createSteps(Recipe recipe, Recipe savedRecipe) {
		List<RecipeStep> updatedSteps = new UpdateRecipeSteps().execute(savedRecipe, recipe.getRecipeSteps());
		return recipeStepsRepository.saveAll(updatedSteps);
	}

	private List<RecipeIngredient> saveIngredients(Recipe savedRecipe, Recipe newRecipe, List<Ingredient> ingredients) {
		new CheckIfIngredientsUnique().execute(ingredients);
		List<Ingredient> allIngredientsCreated = dictionariesFacade.saveManyIngredients(ingredients);
		List<RecipeIngredient> recipeIngredients = new UpdateRecipeIngredientsInRecipe().execute(savedRecipe, newRecipe,
				allIngredientsCreated);
		return recipeIngredientsRepository.saveAll(recipeIngredients);
	}

	private Recipe cleanRecipe(Recipe savedRecipe, List<RecipeIngredient> savedRecipeIngredients,
			List<RecipeStep> allStepsCreated) {
		CleanRecipe clean = new CleanRecipe();

		savedRecipe.setRecipeIngredients(clean.executeIngredients(savedRecipeIngredients));
		savedRecipe.setRecipeSteps(clean.executeSteps(allStepsCreated));
		clean.executeUser(savedRecipe);
		return savedRecipe;
	}
	
	private void deleteRecipeSteps(List<RecipeStep> steps) {
		steps.stream().forEach(step -> recipeStepsRepository.delete(step));
	}
}
