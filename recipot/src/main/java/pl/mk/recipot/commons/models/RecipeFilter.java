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

@Entity
@Data
public class RecipeFilter {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private AppUser owner;

	@NotBlank(message = "Recipe filter name is required")
	private String name;

	@Column(length = 2000)
	@NotBlank(message = "Recipe filter value is required")
	private String value;
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
}
