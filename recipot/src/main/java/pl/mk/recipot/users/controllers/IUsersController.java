package pl.mk.recipot.users.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.AppUser;

@RequestMapping("/api/users")
public interface IUsersController {
	
	@PutMapping("/{id}")
	ResponseEntity<Response<AppUser>> update(@PathVariable("id") UUID id, @RequestBody AppUser user);

}