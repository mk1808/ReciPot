package pl.mk.recipot.recipes.services;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.exceptions.ForbiddenException;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.recipes.domains.CheckIfRecipeWasSharedWithUser;
import pl.mk.recipot.recipes.domains.CheckIfUserIsSharedRecipeOwner;
import pl.mk.recipot.recipes.domains.GetRecipeIsPublic;
import pl.mk.recipot.recipes.domains.GetRecipeWasSharedWithSenderUser;
import pl.mk.recipot.recipes.domains.GetUserIsSharedRecipeOwner;
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

	public ShareRecipeService(IAuthFacade authFacade, IUsersFacade userFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade,
			ISharedRecipesRepository sharedRecipesRepository, ICrudService<Recipe> recipeCrudService) {
		super();
		this.authFacade = authFacade;
		this.userFacade = userFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
		this.sharedRecipesRepository = sharedRecipesRepository;
		this.recipeCrudService = recipeCrudService;
	}

	@Override
	public SharedRecipe shareWithUser(SharedRecipe sharedRecipe) {
		updateRecipeSharingFields(sharedRecipe);
		checkSenderUserSharingPermission(sharedRecipe);
		checkReceiverUserCanReceiveSharing(sharedRecipe);
		SharedRecipe savedSharedRecipe = sharedRecipesRepository.save(sharedRecipe);
		recipeCollectionsFacade.addRecipeToUserDefaultCollection(sharedRecipe.getReceiverUser(),
				DefaultRecipeCollections.SHARED_WITH_USER, sharedRecipe.getRecipe());
		return savedSharedRecipe;
	}

	private void updateRecipeSharingFields(SharedRecipe sharedRecipe) {
		new UpdateRecipeSharingFields().senderUser(authFacade.getCurrentUser())
				.receiverUser(userFacade.getUserById(sharedRecipe.getReceiverUser().getId()))
				.recipe(recipeCrudService.get(sharedRecipe.getRecipe().getId())).execute(sharedRecipe);
	}

	private void checkSenderUserSharingPermission(SharedRecipe sharedRecipe) {
		boolean userHasSharingPrivilege = new GetRecipeIsPublic().execute(sharedRecipe)
				|| new GetUserIsSharedRecipeOwner().execute(sharedRecipe.getSenderUser(), sharedRecipe)
				|| new GetRecipeWasSharedWithSenderUser().execute(sharedRecipe, sharedRecipesRepository
						.findRecipesSharedWithUser(sharedRecipe.getRecipe(), sharedRecipe.getSenderUser()));
		if (!userHasSharingPrivilege) {
			throw new ForbiddenException();
		}
	}

	private void checkReceiverUserCanReceiveSharing(SharedRecipe sharedRecipe) {
		new CheckIfUserIsSharedRecipeOwner().execute(sharedRecipe.getReceiverUser(), sharedRecipe);
		new CheckIfRecipeWasSharedWithUser().execute(sharedRecipesRepository
				.findRecipesSharedWithUser(sharedRecipe.getRecipe(), sharedRecipe.getReceiverUser()));
	}
}
