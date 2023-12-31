package pl.mk.recipot.commons.models;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mk.recipot.commons.enums.NotificationType;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;
import pl.mk.recipot.commons.models.interfaces.IWithDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification implements IUserRelated, IWithDate {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "models.Notification.errors.ownerNull")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@NotNull(message = "models.Notification.errors.typeNull")
	private NotificationType type;

	@Column(length = 2000)
	@NotBlank(message = "models.Notification.errors.valueBlank")
	private String value;
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@Override
	public AppUser getUser() {
		return owner;
	}

	@Override
	public void setUser(AppUser user) {
		setOwner(user);
	}

	@Override
	public void setDate(Date date) {
		setCreated(date);
	}
}
