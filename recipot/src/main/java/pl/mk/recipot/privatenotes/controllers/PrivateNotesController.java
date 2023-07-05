package pl.mk.recipot.privatenotes.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;

import pl.mk.recipot.commons.models.PrivateNote;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.privatenotes.services.IPrivateNotesService;

@RestController
public class PrivateNotesController implements IPrivateNotesController {

	private ICrudService<PrivateNote> privateNoteCrudService;
	private IPrivateNotesService privateNoteService;

	public PrivateNotesController(ICrudService<PrivateNote> privateNoteCrudService,
			IPrivateNotesService privateNoteService) {
		super();
		this.privateNoteCrudService = privateNoteCrudService;
		this.privateNoteService = privateNoteService;
	}

	@Override
	public ResponseEntity<Response<PrivateNote>> createPrivateNote(PrivateNote privateNote) {
		return new CreatedResponseFactory().createResponse(privateNoteCrudService.save(privateNote));
	}

	@Override
	public ResponseEntity<Response<Void>> deletePrivateNote(UUID privateNoteId) {
		privateNoteCrudService.delete(privateNoteId);
		return new OkMessageResponseFactory().createResponse("privateNotes.success.noteDeleted");
	}

	@Override
	public ResponseEntity<Response<PrivateNote>> getPrivateNoteByRecipeId(UUID recipeId) {
		return new OkResponseFactory().createResponse(privateNoteService.getByRecipe(recipeId));
	}

}
