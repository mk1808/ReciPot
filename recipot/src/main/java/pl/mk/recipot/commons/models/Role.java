package pl.mk.recipot.commons.models;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import pl.mk.recipot.commons.enums.RoleType;

@Entity
@Data
public class Role implements GrantedAuthority {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@Enumerated(EnumType.STRING)
	private RoleType name;

	@Override
	public String getAuthority() {
		return name.toString();
	}

}
