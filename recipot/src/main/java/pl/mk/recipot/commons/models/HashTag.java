package pl.mk.recipot.commons.models;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class HashTag {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@NotBlank(message = "HashTag name is required")
	private String name;
}
