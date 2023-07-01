package pl.mk.recipot.auth.configs;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	public static final String AUTH_HEADER = "Authorization";
	public static final String BEARER_PREFIX = "Bearer ";
	
	private JwtUserDetailsService userDetailsService;
	private TokenManager tokenManager;

	public JwtFilter(JwtUserDetailsService userDetailsService, TokenManager tokenManager) {
		super();
		this.userDetailsService = userDetailsService;
		this.tokenManager = tokenManager;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader(AUTH_HEADER);
		String token = getToken(request.getHeader(AUTH_HEADER));
		if (token == null) {
			token = new JwtSecurityUtils().getToken(request);
		}
		String username = getUsernameFromToken(token);
		
		authenticate(username, request, token);
		filterChain.doFilter(request, response);
	}
	
	private boolean tokenExists(String tokenHeader) {
		if (tokenHeader != null && tokenHeader.startsWith(BEARER_PREFIX)) {
			return true;
		}
		System.out.println("Bearer String not found in token");
		//throw new RuntimeException();
		return false;
	}
	
	private String getToken(String tokenHeader) {
		return tokenExists(tokenHeader) ? tokenHeader.substring(7) : null;
	}
	
	private String getUsernameFromToken(String token) {
		if (token!=null) {
			try {
				return tokenManager.getUsernameFromToken(token);
			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		}
		return null;
	}
	
	private void authenticate(String username, HttpServletRequest request, String token) {
		if (null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
			JwtUserDetails userDetails = userDetailsService.loadUserByUsername(username);
			if (tokenManager.validateJwtToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}
		}
		
	}
		
		
	
}