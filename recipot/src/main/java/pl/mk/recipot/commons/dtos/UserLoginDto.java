package pl.mk.recipot.commons.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginDto {
	@NotBlank(message = "dtos.UserLoginDto.errors.loginBlank")
	public String username; 
	@NotBlank(message = "dtos.UserLoginDto.errors.passwordBlank")
	public String password; 
}
