package pl.mk.recipot.recipes.domains;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Recipe;
import pl.mk.recipot.commons.models.SharedRecipe;

public class UpdateRecipeSharingFields {
	AppUser senderUser;
	AppUser receiverUser;
	Recipe recipe;

	public void execute(SharedRecipe sharedRecipe) {
		sharedRecipe.setSenderUser(senderUser);
		sharedRecipe.setReceiverUser(receiverUser);
		sharedRecipe.setRecipe(recipe);
	}

	public UpdateRecipeSharingFields senderUser(AppUser senderUser) {
		this.senderUser = senderUser;
		return this;
	}

	public UpdateRecipeSharingFields receiverUser(AppUser receiverUser) {
		this.receiverUser = receiverUser;
		return this;
	}

	public UpdateRecipeSharingFields recipe(Recipe recipe) {
		this.recipe = recipe;
		return this;
	}
}
