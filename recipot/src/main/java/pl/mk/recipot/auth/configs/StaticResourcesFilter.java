package pl.mk.recipot.auth.configs;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class StaticResourcesFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		uri = uri.split("\\?")[0];
		if (uri.startsWith("/api") || uri.contains(".")) {
			filterChain.doFilter(request, response);
		} else {
			request.getRequestDispatcher("/").forward(request, response);
		}
	}
	
}
