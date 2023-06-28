package pl.mk.recipot.commons.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

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
import lombok.Data;
import pl.mk.recipot.commons.enums.RecipeAccessType;
import pl.mk.recipot.commons.enums.RecipeAmountOfDishes;
import pl.mk.recipot.commons.enums.RecipeDifficulty;
import pl.mk.recipot.commons.enums.RecipeRequiredEffort;

@Entity
@Data
public class Recipe {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@Temporal(TemporalType.DATE)
	private Date created;
	@Temporal(TemporalType.DATE)
	private Date deleted;

	private String name;
	@Column(length = 1000)
	private String description;
	private String url;
	private String image;
	private String timeAmount;
	private double averageRating;
	private int ratingsCount;

	private RecipeAccessType accessType;
	private RecipeAmountOfDishes numberOfDishes;
	private RecipeDifficulty difficulty;
	private RecipeRequiredEffort requiredEffort;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "recipe_hash_tags", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "hash_tag_id"))
	private Set<HashTag> hashTags = new HashSet<>();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "recipe_categories", joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = new HashSet<>();
}