package pl.mk.recipot.commons.models;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;
import jakarta.validation.constraints.Email;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

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
}
