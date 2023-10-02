package pl.mk.recipot.commons.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;
import pl.mk.recipot.commons.models.interfaces.IUserRelated;
import pl.mk.recipot.commons.models.interfaces.IWithDate;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe implements IUserRelated, IWithDate {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	@Temporal(TemporalType.TIMESTAMP)
	private Date deleted;

	@NotBlank(message = "models.Recipe.errors.nameBlank")
	private String name;
	@Column(length = 1000)
	private String description;
	private String url;
	private String image;
	private Long timeAmount;
	private double averageRating;
	private int ratingsCount;

	private RecipeAccessType accessType;
	private RecipeAmountOfDishes numberOfDishes;
	private RecipeDifficulty difficulty;
	private RecipeRequiredEffort requiredEffort;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "recipe_hash_tags", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "hash_tag_id"))
	private Set<HashTag> hashTags = new HashSet<>();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "recipe_categories", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = new HashSet<>();

	@Transient
	private List<RecipeStep> recipeSteps = new ArrayList();

	@Transient
	private List<RecipeIngredient> recipeIngredients = new ArrayList();

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Recipe other = (Recipe) obj;
		return accessType == other.accessType
				&& Double.doubleToLongBits(averageRating) == Double.doubleToLongBits(other.averageRating)
				&& Objects.equals(categories, other.categories) && Objects.equals(created, other.created)
				&& Objects.equals(deleted, other.deleted) && Objects.equals(description, other.description)
				&& difficulty == other.difficulty && Objects.equals(hashTags, other.hashTags)
				&& Objects.equals(id, other.id) && Objects.equals(image, other.image)
				&& Objects.equals(name, other.name) && numberOfDishes == other.numberOfDishes
				&& Objects.equals(owner, other.owner) && ratingsCount == other.ratingsCount
				&& requiredEffort == other.requiredEffort && Objects.equals(timeAmount, other.timeAmount)
				&& Objects.equals(url, other.url);
	}

	@Override
	public int hashCode() {
		return Objects.hash(accessType, averageRating, categories, created, deleted, description, difficulty, hashTags,
				id, image, name, numberOfDishes, owner, ratingsCount, requiredEffort, timeAmount, url);
	}

	@JsonIgnore
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
