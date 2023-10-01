package pl.mk.recipot.recipes.services;

import java.util.UUID;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.opinions.facades.IOpinionsFacade;
import pl.mk.recipot.privatenotes.facades.IPrivateNotesFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfRecipeDoesNotExists;
import pl.mk.recipot.recipes.repositories.IRecipeIngredientsRepository;
import pl.mk.recipot.recipes.repositories.IRecipeStepsRepository;
import pl.mk.recipot.recipes.repositories.IRecipesRepository;

@Service
public class DeleteRecipeService {
	private IRecipesRepository recipesRepository;
	private IRecipeIngredientsRepository recipeIngredientsRepository;
	private IAuthFacade authFacade;
	private IRecipeStepsRepository recipeStepsRepository;
	private IRecipeCollectionsFacade recipeCollectionsFacade;
	private IPrivateNotesFacade privateNotesFacade;
	private IOpinionsFacade opinionsFacade;
	private IShareRecipeService shareRecipeService;

	public DeleteRecipeService(IRecipesRepository recipesRepository,
			IRecipeIngredientsRepository recipeIngredientsRepository, IAuthFacade authFacade,
			IRecipeStepsRepository recipeStepsRepository, IRecipeCollectionsFacade recipeCollectionsFacade,
			IPrivateNotesFacade privateNotesFacade, IOpinionsFacade opinionsFacade, @Lazy IShareRecipeService shareRecipeService) {
		super();
		this.recipesRepository = recipesRepository;
		this.recipeIngredientsRepository = recipeIngredientsRepository;
		this.authFacade = authFacade;
		this.recipeStepsRepository = recipeStepsRepository;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
		this.privateNotesFacade = privateNotesFacade;
		this.opinionsFacade = opinionsFacade;
		this.shareRecipeService = shareRecipeService;
	}

	public void delete(Recipe existingRecipe) {
		UUID id = existingRecipe.getId();
		new CheckIfRecipeDoesNotExists().execute(existingRecipe);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), existingRecipe);
		existingRecipe.getCategories().removeAll(existingRecipe.getCategories());
		existingRecipe.getHashTags().removeAll(existingRecipe.getHashTags());
		recipeStepsRepository.deleteByRecipeId(id);
		recipeIngredientsRepository.deleteByRecipeId(id);
		recipeCollectionsFacade.deleteRecipeFromCollection(existingRecipe);
		privateNotesFacade.deletePrivateNotesByRecipe(id);
		opinionsFacade.deleteOpinionsByRecipe(id);
		shareRecipeService.deleteSharingByRecipeId(id);

		recipesRepository.deleteById(id);
	}

}
