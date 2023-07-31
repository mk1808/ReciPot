package pl.mk.recipot.commons.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCollection implements IUserRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@NotBlank(message = "models.RecipeCollection.errors.nameBlank")
	private String name;
	private boolean canDelete = true;

	@Transient
	private List<RecipeCollectionItem> recipeCollectionItems = new ArrayList<>();

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RecipeCollection other = (RecipeCollection) obj;
		return canDelete == other.canDelete && Objects.equals(id, other.id) && Objects.equals(name, other.name)
				&& Objects.equals(owner, other.owner);
	}

	@Override
	public int hashCode() {
		return Objects.hash(canDelete, id, name, owner);
	}

	@Override
	public AppUser getUser() {
		return owner;
	}

	@Override
	public void setUser(AppUser user) {
		setOwner(user);
	}
}
