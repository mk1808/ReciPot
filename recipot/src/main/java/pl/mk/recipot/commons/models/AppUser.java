package pl.mk.recipot.commons.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;
import jakarta.validation.constraints.Email;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;

@Entity
public class AppUser {
	@Id
	@GeneratedValue
	@UuidGenerator
	private UUID id;

	@Email
	private String email;
	private String login;
	private String password;
	private String role;
	private Boolean verified;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
			name = "app_users_roles", 
			joinColumns = @JoinColumn(name = "user_id"), 
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
}
