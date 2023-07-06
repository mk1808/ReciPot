package pl.mk.recipot.notifications.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Notification;

public interface INotificationsRepository extends JpaRepository<Notification, UUID> {

	@Query("SELECT n FROM Notification n where n.owner = :user and n.created >= :dateSince")
	List<Notification> getLastNotifications(AppUser user, Date dateSince);
}
