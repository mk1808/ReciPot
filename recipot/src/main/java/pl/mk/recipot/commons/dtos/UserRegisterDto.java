package pl.mk.recipot.commons.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UserRegisterDto {
	@Email(message = "User email is not valid")
	public String email;
	@NotBlank(message = "User login is required")
	public String login;
	@NotBlank(message = "User password is required")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$", message = "Password to weak")
	public String password;
	@NotBlank(message = "User matchingPassword is required")
	public String matchingPassword;
}
