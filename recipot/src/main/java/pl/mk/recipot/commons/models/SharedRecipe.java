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
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

@Entity
@Data
public class SharedRecipe implements IUserRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "models.SharedRecipe.errors.recipeNull")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_user_id")
	private AppUser senderUser;

	@NotNull(message = "models.SharedRecipe.errors.receiverUserNull")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_user_id")
	private AppUser receiverUser;

	@NotBlank(message = "models.SharedRecipe.errors.commentBlank")
	@Column(length = 1000)
	private String comment;
	
	@Override
	public AppUser getUser() {
		return senderUser;
	}

	@Override
	public void setUser(AppUser user) {
		setSenderUser(user);
	}
}
