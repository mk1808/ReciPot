package pl.mk.recipot.recipes.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserDoesNotExists;
import pl.mk.recipot.commons.domains.CheckIfUserIsOwner;
import pl.mk.recipot.commons.domains.GetIsUserOwner;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.notifications.facades.INotificationsFacade;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfRecipeWasSharedWithUser;
import pl.mk.recipot.recipes.domains.GetRecipeIsPublic;
import pl.mk.recipot.recipes.domains.GetRecipeWasSharedWithSenderUser;
import pl.mk.recipot.recipes.domains.UpdateRecipeSharingFields;
import pl.mk.recipot.recipes.repositories.ISharedRecipesRepository;
import pl.mk.recipot.users.facades.IUsersFacade;

@Service
public class ShareRecipeService implements IShareRecipeService {

	private IAuthFacade authFacade;
	private IUsersFacade userFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;
	private ISharedRecipesRepository sharedRecipesRepository;
	private ICrudService<Recipe> recipeCrudService;
	private INotificationsFacade notificationFacade;

	public ShareRecipeService(IAuthFacade authFacade, IUsersFacade userFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade, ISharedRecipesRepository sharedRecipesRepository,
			ICrudService<Recipe> recipeCrudService, INotificationsFacade notificationFacade) {
		super();
		this.authFacade = authFacade;
		this.userFacade = userFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
		this.sharedRecipesRepository = sharedRecipesRepository;
		this.recipeCrudService = recipeCrudService;
		this.notificationFacade = notificationFacade;
	}

	@Override
	public SharedRecipe shareWithUser(SharedRecipe sharedRecipe) {
		updateRecipeSharingFields(sharedRecipe);
		checkSenderUserSharingPermission(sharedRecipe);
		checkReceiverUserCanReceiveSharing(sharedRecipe);
		SharedRecipe savedSharedRecipe = sharedRecipesRepository.save(sharedRecipe);
		recipeCollectionsFacade.addRecipeToUserDefaultCollection(sharedRecipe.getReceiverUser(),
				DefaultRecipeCollections.SHARED_WITH_YOU, sharedRecipe.getRecipe());
		notificationFacade.notifySharedRecipe(savedSharedRecipe);
		return savedSharedRecipe;
	}

	private void updateRecipeSharingFields(SharedRecipe sharedRecipe) {
		new UpdateRecipeSharingFields().senderUser(authFacade.getCurrentUser())
				.receiverUser(userFacade.getUserByLogin(sharedRecipe.getReceiverUser().getLogin()))
				.recipe(recipeCrudService.get(sharedRecipe.getRecipe().getId())).execute(sharedRecipe);
	}

	private void checkSenderUserSharingPermission(SharedRecipe sharedRecipe) {
		boolean userHasSharingPrivilege = new GetRecipeIsPublic().execute(sharedRecipe)
				|| new GetIsUserOwner().execute(sharedRecipe.getSenderUser(), sharedRecipe)
				|| new GetRecipeWasSharedWithSenderUser().execute(sharedRecipe, sharedRecipesRepository
						.findRecipesSharedWithUser(sharedRecipe.getRecipe(), sharedRecipe.getSenderUser()));
		if (!userHasSharingPrivilege) {
			throw new ForbiddenException();
		}
	}

	private void checkReceiverUserCanReceiveSharing(SharedRecipe sharedRecipe) {
		new CheckIfUserDoesNotExists().execute(sharedRecipe.getReceiverUser());
		new CheckIfUserIsOwner().execute(sharedRecipe.getReceiverUser(), sharedRecipe);
		new CheckIfRecipeWasSharedWithUser().execute(sharedRecipesRepository
				.findRecipesSharedWithUser(sharedRecipe.getRecipe(), sharedRecipe.getReceiverUser()));
	}
	
	@Override
	public void deleteSharingByRecipeId(UUID recipeId) {
		sharedRecipesRepository.deleteSharingByRecipeId(recipeId);
	}
}
