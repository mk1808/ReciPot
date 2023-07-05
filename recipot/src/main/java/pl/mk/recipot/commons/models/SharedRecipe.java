package pl.mk.recipot.commons.models;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class SharedRecipe {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "Shared recipe is required")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_user_id")
	private AppUser senderUser;

	@NotNull(message = "Shared recipe receiver user is required")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_user_id")
	private AppUser receiverUser;

	@NotBlank(message = "Shared recipe comment is required")
	@Column(length = 1000)
	private String comment;
}
