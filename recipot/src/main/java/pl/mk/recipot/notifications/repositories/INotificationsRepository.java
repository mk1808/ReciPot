package pl.mk.recipot.notifications.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;
import pl.mk.recipot.notifications.dtos.NotificationDto;

public interface INotificationsRepository extends JpaRepository<Notification, UUID> {

	@Query("SELECT new pl.mk.recipot.notifications.dtos.NotificationDto(n.id, n.type, n.value) FROM Notification n where n.owner = :user and n.created >= :dateSince")
	List<NotificationDto> getLastNotifications(AppUser user, Date dateSince);
}
