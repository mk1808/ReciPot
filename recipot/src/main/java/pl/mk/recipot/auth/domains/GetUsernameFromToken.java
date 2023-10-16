package pl.mk.recipot.auth.domains;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class GetUsernameFromToken {	
	public String execute(String token, String secret) {
	final Claims claims = getClaims(token, secret);
	return claims.getSubject();
}

	private Claims getClaims(String token, String jwtSecret) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
	}
}
