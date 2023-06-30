package pl.mk.recipot.auth.configs;

import jakarta.servlet.http.Cookie;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletResponse;

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
	
	@GetMapping("/logout2")
	public String logout(HttpServletResponse response) {
		response.addCookie(new Cookie("token", null));
		return "hello";
	}
}