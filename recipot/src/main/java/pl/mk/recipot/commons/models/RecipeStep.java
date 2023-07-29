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
import pl.mk.recipot.commons.models.interfaces.IRecipeRelated;

@Entity
@Data
public class RecipeStep implements IRecipeRelated {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@NotNull(message = "models.RecipeStep.errors.orderNul")
	@Column(name = "step_order")
	private Integer order;
	@NotBlank(message = "models.RecipeStep.errors.descriptionBlank")
	@Column(length = 1000)
	private String description;
}
