package pl.mk.recipot.commons.models;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Role implements GrantedAuthority {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	private String name;

	@Override
	public String getAuthority() {
		return name;
	}

}
