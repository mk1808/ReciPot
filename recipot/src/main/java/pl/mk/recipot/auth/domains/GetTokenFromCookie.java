package pl.mk.recipot.auth.domains;

import java.util.Arrays;
import java.util.List;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class GetTokenFromCookie {
	public String execute(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}
		return findToken(cookies);
	}

	private String findToken(Cookie[] cookies) {
		List<Cookie> cookieWithToken = Arrays.asList(cookies)
				.stream()
				.filter(cookie -> cookie.getName().equals("token"))
				.toList();

		return cookieWithToken.isEmpty() ? null : cookieWithToken.get(0).getValue();
	}
}
