package pl.mk.recipot.commons.models;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mk.recipot.commons.models.interfaces.IRecipeRelated;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCollectionItem implements IRecipeRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "models.RecipeCollectionItem.errors.recipeNull")
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "collection_id")
	private RecipeCollection collection;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
}
