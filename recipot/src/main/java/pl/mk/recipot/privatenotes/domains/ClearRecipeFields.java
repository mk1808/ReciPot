package pl.mk.recipot.privatenotes.domains;

import pl.mk.recipot.commons.models.PrivateNote;

public class ClearRecipeFields {
	public PrivateNote execute(PrivateNote privateNote) {
		if (privateNote == null) {
			return null;
		}
		privateNote.setRecipe(null);
		privateNote.setAuthor(null);
		return privateNote;
	}
}
