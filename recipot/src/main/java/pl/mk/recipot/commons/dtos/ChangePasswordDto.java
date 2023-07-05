package pl.mk.recipot.commons.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ChangePasswordDto {
	@NotBlank(message = "dtos.ChangePasswordDto.errors.passwordBlank")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$", message = "dtos.ChangePasswordDto.errors.passwordWeak")
	public String password;
	@NotBlank(message = "dtos.ChangePasswordDto.errors.matchingPasswordBlank")
	public String matchingPassword;
	@NotNull(message = "dtos.ChangePasswordDto.errors.userIdNull")
	public UUID userId;

}
