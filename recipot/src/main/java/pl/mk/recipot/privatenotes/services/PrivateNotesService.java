package pl.mk.recipot.privatenotes.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.enums.DefaultRecipeCollections;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.privatenotes.domains.CheckIfPrivateNoteDoesNotExists;
import pl.mk.recipot.privatenotes.domains.ClearRecipeFields;
import pl.mk.recipot.privatenotes.domains.FillPrivateNoteAuthorAndCreationDate;
import pl.mk.recipot.privatenotes.domains.GetPrivateNote;
import pl.mk.recipot.privatenotes.domains.UpdatePrivateNote;
import pl.mk.recipot.privatenotes.repositories.IPrivateNotesRepository;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;

@Service
public class PrivateNotesService implements IPrivateNotesService, ICrudService<PrivateNote> {

	private IPrivateNotesRepository privateNotesRepository;
	private IAuthFacade authFacade;
	private IRecipeCollectionsFacade recipeCollectionsFacade;

	public PrivateNotesService(IPrivateNotesRepository privateNotesRepository, IAuthFacade authFacade, IRecipeCollectionsFacade recipeCollectionsFacade) {
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
		
		if (existingNote.isEmpty()) {
			recipeCollectionsFacade.addRecipeToUserDefaultCollection(currentUser, DefaultRecipeCollections.NOTED, privateNote.getRecipe());
			return new ClearRecipeFields().execute(privateNotesRepository
					.save(new FillPrivateNoteAuthorAndCreationDate().execute(privateNote, currentUser)));
		}
		
		return new ClearRecipeFields().execute(
				privateNotesRepository.save(new UpdatePrivateNote().execute(existingNote.get(0), privateNote)));
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
		Optional<PrivateNote> optionalPrivateNote = privateNotesRepository.findById(id);
		new CheckIfPrivateNoteDoesNotExists().execute(optionalPrivateNote);
		PrivateNote privateNote = new GetPrivateNote().execute(optionalPrivateNote);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), privateNote);
		privateNotesRepository.delete(privateNote);
	}

	@Override
	public PrivateNote getByRecipe(UUID recipeId) {
		return new ClearRecipeFields()
				.execute(privateNotesRepository.findByUserAndRecipeId(authFacade.getCurrentUser(), recipeId));
	}

}
