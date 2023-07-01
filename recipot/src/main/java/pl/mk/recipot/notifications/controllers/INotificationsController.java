package pl.mk.recipot.notifications.controllers;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.notifications.dtos.NotificationDto;

@RequestMapping("/api/notifications")
public interface INotificationsController {

	@GetMapping()
	List<NotificationDto> getLastNotifications(
			@RequestParam(value = "dateSince") @DateTimeFormat(pattern = "dd.MM.yyyy HH:mm:ss") Date dateSince);

	@PostMapping()
	Notification createNotification(@RequestBody Notification notification);

	@DeleteMapping("/{notificationId}")
	ResponseEntity<Response<Void>> deleteNotification(@PathVariable UUID notificationId);
}
