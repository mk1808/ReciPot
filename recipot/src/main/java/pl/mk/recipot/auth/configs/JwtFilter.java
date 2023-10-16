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
import lombok.extern.slf4j.Slf4j;
import pl.mk.recipot.auth.domains.GetTokenFromCookie;
import pl.mk.recipot.auth.domains.GetTokenFromHeader;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.auth.services.ITokenManagerService;
import pl.mk.recipot.auth.services.JwtUserDetailsService;

@Component
public class JwtFilter extends OncePerRequestFilter {


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
		String token = tokenManagerService.get( request);
		String username = tokenManagerService.getUsername(token);
		authenticate(username, request, token);
		filterChain.doFilter(request, response);
	}

	private void authenticate(String username, HttpServletRequest request, String token) {
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			JwtUserDetailsDto userDetails = userDetailsService.loadUserByUsername(username);
			if (tokenManagerService.validate(token, userDetails)) {
				authenticateForValidToken(userDetails, request);
			}
		}
	}

	private void authenticateForValidToken(JwtUserDetailsDto userDetails, HttpServletRequest request) {
		UsernamePasswordAuthenticationToken authToken = tokenManagerService.build(userDetails);
		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authToken);
	}

}