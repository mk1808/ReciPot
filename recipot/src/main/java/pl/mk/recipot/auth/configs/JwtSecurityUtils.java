package pl.mk.recipot.auth.configs;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class JwtSecurityUtils {

	String getToken(HttpServletRequest request) {
		// Get the cookies from the request
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}

		// Find the cookie with the cookie name for the JWT token
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if (!cookie.getName().equals("token")) {
				continue;
			}
			// If we find the JWT cookie, return its value
			return cookie.getValue();
		}
		// Return empty if no cookie is found
		return null;
	}

}
