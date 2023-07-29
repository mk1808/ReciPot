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
import lombok.Data;
import pl.mk.recipot.commons.models.interfaces.IRecipeRelated;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

@Entity
@Data
public class PrivateNote implements IUserRelated, IRecipeRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "models.PrivateNote.errors.recipeNull")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private AppUser author;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@NotBlank(message = "models.PrivateNote.errors.contentBlank")
	@Column(length = 1000)
	private String content;
	
	@Override
	public AppUser getUser() {
		return author;
	}

	@Override
	public void setUser(AppUser user) {
		setAuthor(user);
	}
}
