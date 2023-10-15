package pl.mk.recipot.auth.services;

import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;

public interface ITokenManagerService {
	
	public String generateJwtToken(JwtUserDetailsDto userDetails);

	public Boolean validateJwtToken(String token, JwtUserDetailsDto userDetails);

	public String getUsernameFromToken(String token);
}
