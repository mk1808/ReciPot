package pl.mk.recipot.privatenotes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.PrivateNote;

@RequestMapping("/api/privateNotes")
public interface IPrivateNotesController {

	@PostMapping
	ResponseEntity<Response<PrivateNote>> createPrivateNote(@RequestBody PrivateNote privateNote);
}
