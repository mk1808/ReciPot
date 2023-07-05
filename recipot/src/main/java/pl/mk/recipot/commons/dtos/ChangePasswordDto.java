package pl.mk.recipot.commons.dtos;

import java.util.UUID;

import jakarta.validation.constraints.Pattern;

public class ChangePasswordDto {
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$", message = "Password to weak")
	public String password;
	public String matchingPassword;
	public UUID userId;

}
