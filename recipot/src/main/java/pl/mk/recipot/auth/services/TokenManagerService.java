package pl.mk.recipot.auth.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;

@Service
public class TokenManagerService implements ITokenManagerService{
	public static final long TOKEN_VALIDITY = 10 * 60 * 60;

	@Value("${secret}")
	private String jwtSecret;

	public String generateJwtToken(JwtUserDetailsDto userDetails) {
		Map<String, Object> claims = new HashMap<>();

		return Jwts.builder()
				.setClaims(claims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}

	public Boolean validateJwtToken(String token, JwtUserDetailsDto userDetails) {
		String username = getUsernameFromToken(token);
		Claims claims = getClaims(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(claims);
	}

	public String getUsernameFromToken(String token) {
		final Claims claims = getClaims(token);
		return claims.getSubject();
	}
	
	private Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
	}
	
	private boolean isTokenExpired(Claims claims) {
		return claims.getExpiration().before(new Date());
	}
}
