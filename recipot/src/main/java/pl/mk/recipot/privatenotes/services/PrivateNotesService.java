package pl.mk.recipot.privatenotes.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.SetRecipeNull;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.privatenotes.domains.CheckIfPrivateNoteDoesNotExists;
import pl.mk.recipot.privatenotes.domains.UpdateAuthorAndCreationDateInPrivateNote;
import pl.mk.recipot.privatenotes.domains.UpdatePrivateNote;
import pl.mk.recipot.privatenotes.repositories.IPrivateNotesRepository;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;

@Service
public class PrivateNotesService implements IPrivateNotesService, ICrudService<PrivateNote> {

	private IPrivateNotesRepository privateNotesRepository;
	private IAuthFacade authFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public PrivateNotesService(IPrivateNotesRepository privateNotesRepository, IAuthFacade authFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.privateNotesRepository = privateNotesRepository;
		this.authFacade = authFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
	}

	@Override
	public PrivateNote save(PrivateNote privateNote) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<PrivateNote> existingNote = privateNotesRepository.findByUserAndRecipe(currentUser,
				privateNote.getRecipe());
		PrivateNote note;
		if (existingNote.isEmpty()) {
			recipeCollectionsFacade.addRecipeToUserDefaultCollection(currentUser, DefaultRecipeCollections.NOTED,
					privateNote.getRecipe());
			note = privateNotesRepository
					.save(new UpdateAuthorAndCreationDateInPrivateNote().execute(privateNote, currentUser));
		} else {
			note = privateNotesRepository.save(new UpdatePrivateNote().execute(existingNote.get(0), privateNote));
		}

		new SetUserNull().execute(note);
		new SetRecipeNull().execute(note);
		return note;
	}

	@Override
	public PrivateNote update(PrivateNote obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public PrivateNote get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		PrivateNote existingPrivateNote = privateNotesRepository.findById(id).orElse(null);
		new CheckIfPrivateNoteDoesNotExists().execute(existingPrivateNote);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), existingPrivateNote);
		privateNotesRepository.delete(existingPrivateNote);
	}

	@Override
	public PrivateNote getByRecipe(UUID recipeId) {
		PrivateNote note = privateNotesRepository.findByUserAndRecipeId(authFacade.getCurrentUser(), recipeId);
		new SetUserNull().execute(note);
		new SetRecipeNull().execute(note);
		return note;
	}

}
