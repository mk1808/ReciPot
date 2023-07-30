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
import lombok.Data;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

@Entity
@Data
public class RecipeFilter implements IUserRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@NotBlank(message = "models.RecipeFilter.errors.nameBlank")
	private String name;

	@Column(length = 2000)
	@NotBlank(message = "models.RecipeFilter.errors.valueBlank")
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
}
