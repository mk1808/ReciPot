package pl.mk.recipot.auth.configs;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Claims; 
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component 
public class TokenManager implements Serializable {

   private static final long serialVersionUID = 7008375124389347049L; 
   public static final long TOKEN_VALIDITY = 10 * 60 * 60; 
   @Value("${secret}") 
   private String jwtSecret; 
   public String generateJwtToken(UserDetails userDetails) { 
      Map<String, Object> claims = new HashMap<>(); 
     /* return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()) 
         .setIssuedAt(new Date(System.currentTimeMillis())) 
         .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000)) 
         .signWith(SignatureAlgorithm.HS512, jwtSecret)
         .compact(); */
     
      return Jwts.builder()
			  .setIssuer("Stormpath")
			  .setSubject("msilverman")
			  .claim("name", "Micah Silverman")
			  .claim("scope", "admins")
			  // Fri Jun 24 2016 15:33:42 GMT-0400 (EDT)
			  .setIssuedAt(Date.from(Instant.ofEpochSecond(1466796822L)))
			  // Sat Jun 24 2116 15:33:42 GMT-0400 (EDT)
			  .setExpiration(Date.from(Instant.ofEpochSecond(4622470422L)))
			  .signWith(
					    SignatureAlgorithm.HS512,
					    TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=")
			  )
	      .compact();
   } 
   public Boolean validateJwtToken(String token, UserDetails userDetails) { 
      String username = getUsernameFromToken(token); 
      Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
      Boolean isTokenExpired = claims.getExpiration().before(new Date()); 
      return (username.equals(userDetails.getUsername()) && !isTokenExpired); 
   } 
   public String getUsernameFromToken(String token) {
      final Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody(); 
      return claims.getSubject(); 
   } 
}
