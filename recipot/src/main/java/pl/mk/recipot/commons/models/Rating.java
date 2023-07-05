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
import lombok.Data;

@Entity
@Data
public class Rating {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotNull(message = "Rating connected recipe is required")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "author_id")
	private AppUser author;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@NotNull(message = "Rating value is required")
	private Double value;
}
