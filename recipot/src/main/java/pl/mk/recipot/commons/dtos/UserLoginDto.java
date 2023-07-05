package pl.mk.recipot.commons.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginDto {
	@NotBlank(message = "User login is required")
	public String username; 
	@NotBlank(message = "User password is required")
	public String password; 
}
