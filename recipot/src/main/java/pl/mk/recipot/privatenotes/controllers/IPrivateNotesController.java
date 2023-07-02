package pl.mk.recipot.privatenotes.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.PrivateNote;

@RequestMapping("/api/privateNotes")
public interface IPrivateNotesController {

	@PostMapping
	ResponseEntity<Response<PrivateNote>> createPrivateNote(@RequestBody PrivateNote privateNote);

	@DeleteMapping("/{privateNoteId}")
	ResponseEntity<Response<Void>> deletePrivateNote(@PathVariable UUID privateNoteId);

	@GetMapping("/{recipeId}")
	ResponseEntity<Response<PrivateNote>> getPrivateNoteByRecipeId(@PathVariable UUID recipeId);

}
