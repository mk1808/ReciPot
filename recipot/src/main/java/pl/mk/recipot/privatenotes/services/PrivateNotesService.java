package pl.mk.recipot.privatenotes.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.PrivateNote;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.privatenotes.domains.CheckIfUserIsAuthor;
import pl.mk.recipot.privatenotes.domains.ClearRecipeFields;
import pl.mk.recipot.privatenotes.domains.FillPrivateNoteAuthorAndCreationDate;
import pl.mk.recipot.privatenotes.domains.GetPrivateNoteIfExists;
import pl.mk.recipot.privatenotes.domains.UpdatePrivateNote;
import pl.mk.recipot.privatenotes.repositories.IPrivateNotesRepository;

@Service
public class PrivateNotesService implements IPrivateNotesService, ICrudService<PrivateNote> {

	private IPrivateNotesRepository privateNotesRepository;
	private IAuthFacade authFacade;

	public PrivateNotesService(IPrivateNotesRepository privateNotesRepository, IAuthFacade authFacade) {
		super();
		this.privateNotesRepository = privateNotesRepository;
		this.authFacade = authFacade;
	}

	@Override
	public PrivateNote save(PrivateNote privateNote) {
		AppUser currentUser = authFacade.getCurrentUser();
		List<PrivateNote> existingRecipe = privateNotesRepository.findByUserAndRecipe(currentUser,
				privateNote.getRecipe());
		if (existingRecipe.isEmpty()) {
			return new ClearRecipeFields().execute(privateNotesRepository
					.save(new FillPrivateNoteAuthorAndCreationDate().execute(privateNote, currentUser)));
		}
		return new ClearRecipeFields().execute(
				privateNotesRepository.save(new UpdatePrivateNote().execute(existingRecipe.get(0), privateNote)));
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
		PrivateNote privateNote = new GetPrivateNoteIfExists().execute(privateNotesRepository.findById(id));
		new CheckIfUserIsAuthor().execute(authFacade.getCurrentUser(), privateNote);
		privateNotesRepository.delete(privateNote);
	}

	@Override
	public PrivateNote getByRecipe(UUID recipeId) {
		return new ClearRecipeFields().execute(privateNotesRepository.findByUserAndRecipeId(authFacade.getCurrentUser(), recipeId));
	}

}
