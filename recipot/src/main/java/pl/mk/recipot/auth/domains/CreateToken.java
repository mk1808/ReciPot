package pl.mk.recipot.auth.domains;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import pl.mk.recipot.commons.dtos.UserLoginDto;

public class CreateToken {
	
	public UsernamePasswordAuthenticationToken execute(UserLoginDto userLogin) {
		return new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword());
	}

}
