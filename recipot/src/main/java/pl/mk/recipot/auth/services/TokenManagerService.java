package pl.mk.recipot.auth.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import pl.mk.recipot.auth.domains.GetTokenFromCookie;
import pl.mk.recipot.auth.domains.GetTokenFromHeader;
import pl.mk.recipot.auth.domains.GetUsernameFromToken;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.commons.dtos.UserLoginDto;

@Service
@Slf4j
public class TokenManagerService implements ITokenManagerService {
	public static final long TOKEN_VALIDITY = 10 * 60 * 60;
	public static final String AUTH_HEADER = "Authorization";

	@Value("${secret}")
	private String jwtSecret;

	@Override
	public String generate(JwtUserDetailsDto userDetails) {
		Map<String, Object> claims = new HashMap<>();

		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	@Override
	public UsernamePasswordAuthenticationToken build(JwtUserDetailsDto userDetails) {
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	@Override
	public UsernamePasswordAuthenticationToken build(UserLoginDto userLogin) {
		return new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword());
	}

	@Override
	public Boolean validate(String token, JwtUserDetailsDto userDetails) {
		String username = getUsername(token);
		Claims claims = getClaims(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(claims);
	}

	@Override
	public String get(HttpServletRequest request) {
		String token = new GetTokenFromHeader().execute(request.getHeader(AUTH_HEADER));
		if (token == null) {
			log.debug("Bearer String not found in token");
			return new GetTokenFromCookie().execute(request);
		}

		return token;
	}

	@Override
	public String getUsername(String token) {
		if (token != null) {
			try {
				new GetUsernameFromToken().execute(token, jwtSecret);
			} catch (IllegalArgumentException e) {
				log.error("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				log.error("JWT Token has expired");
			}
		}
		return null;
	}

	private Claims getClaims(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
	}

	private boolean isTokenExpired(Claims claims) {
		return claims.getExpiration().before(new Date());
	}

}
