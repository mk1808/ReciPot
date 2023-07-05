package pl.mk.recipot.commons.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ChangePasswordDto {
	@NotBlank(message = "User password is required")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$", message = "Password to weak")
	public String password;
	@NotBlank(message = "User matchingPassword is required")
	public String matchingPassword;
	@NotNull(message = "User id is required")
	public UUID userId;

}
