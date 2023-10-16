package pl.mk.recipot.auth.services;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import jakarta.servlet.http.HttpServletRequest;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.commons.dtos.UserLoginDto;

public interface ITokenManagerService {

	String generate(JwtUserDetailsDto userDetails);

	String get(HttpServletRequest request);

	String getUsername(String token);

	Boolean validate(String token, JwtUserDetailsDto userDetails);

	UsernamePasswordAuthenticationToken build(UserLoginDto userLogin);	
	
	UsernamePasswordAuthenticationToken build(JwtUserDetailsDto userDetails);
}
