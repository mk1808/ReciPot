package pl.mk.recipot.notifications.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Notification;

@RequestMapping("/api/notifications")
public interface INotificationsController {

	@GetMapping()
	ResponseEntity<Response<List<Notification>>> getLastNotifications(
			@RequestParam(value = "timeFrom", defaultValue = "0") Long timeFrom);

	@PostMapping()
	ResponseEntity<Response<Notification>> createNotification(@RequestBody @Valid Notification notification);

	@DeleteMapping("/{notificationId}")
	ResponseEntity<Response<Void>> deleteNotification(@PathVariable UUID notificationId);
}
