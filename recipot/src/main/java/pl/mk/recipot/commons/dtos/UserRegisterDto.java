package pl.mk.recipot.commons.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UserRegisterDto {
	@NotBlank(message = "dtos.UserRegisterDto.errors.emailBlank")
	@Email(message = "dtos.UserRegisterDto.errors.emailInvalid")
	public String email;
	@NotBlank(message = "dtos.UserRegisterDto.errors.loginBlank")
	public String login;
	@NotBlank(message = "dtos.UserRegisterDto.errors.passwordBlank")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$", message = "dtos.UserRegisterDto.errors.passwordWeak")
	public String password;
	@NotBlank(message = "dtos.UserRegisterDto.errors.matchingPasswordBlank")
	public String matchingPassword;
}
