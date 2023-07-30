package pl.mk.recipot.auth.configs;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.exceptions.UnauthorizedException;
import pl.mk.recipot.commons.factories.UnauthorizedResponseFactory;

@RestController
public class HelloController {

	@PreAuthorize("hasAuthority({'USER'})")
	@GetMapping("/helloUser")
	public String helloUser() {
		return "helloUser";
	}

	@PreAuthorize("hasAuthority({'ADMIN'})")
	@GetMapping("/helloAdmin")
	public String helloAdmin() {
		return "helloAdmin";
	}

	@GetMapping("/hello")
	public String hello() {
		return "hello";
	}

	@GetMapping("/hello2")
	public String hello2() {
		throw new UnauthorizedException();
		// return "hello";
	}

	@GetMapping("/hello3")
	public ResponseEntity<Response<Void>> hello3() {
		return new UnauthorizedResponseFactory().createResponse("unauth", "u dont have access");
	}

	@GetMapping("/logout2")
	public String logout(HttpServletResponse response) {
		response.addCookie(new Cookie("token", null));
		return "hello";
	}
}