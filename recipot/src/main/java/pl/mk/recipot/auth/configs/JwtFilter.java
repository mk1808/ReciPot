package pl.mk.recipot.auth.configs;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.auth.domains.GetTokenFromCookie;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.auth.services.ITokenManagerService;
import pl.mk.recipot.auth.services.JwtUserDetailsService;

@Component
public class JwtFilter extends OncePerRequestFilter {

	public static final String AUTH_HEADER = "Authorization";
	public static final String BEARER_PREFIX = "Bearer ";

	private JwtUserDetailsService userDetailsService;
	private ITokenManagerService tokenManagerService;

	public JwtFilter(JwtUserDetailsService userDetailsService, ITokenManagerService tokenManagerService) {
		super();
		this.userDetailsService = userDetailsService;
		this.tokenManagerService = tokenManagerService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = getToken(request.getHeader(AUTH_HEADER));
		if (token == null) {
			token = new GetTokenFromCookie().execute(request);
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
		return false;
	}

	private String getToken(String tokenHeader) {
		return tokenExists(tokenHeader) ? tokenHeader.substring(7) : null;
	}

	private String getUsernameFromToken(String token) {
		if (token != null) {
			try {
				return tokenManagerService.getUsernameFromToken(token);
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
			JwtUserDetailsDto userDetails = userDetailsService.loadUserByUsername(username);
			if (tokenManagerService.validateJwtToken(token, userDetails)) {
				authenticateForValidToken(userDetails, request);
			}
		}
	}

	private void authenticateForValidToken(JwtUserDetailsDto userDetails, HttpServletRequest request) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails.getAuthorities());
		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(authToken);
	}

}