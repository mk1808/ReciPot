package pl.mk.recipot.auth.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

	private static final String[] WHITE_LIST_URLS = { "/api/auth/register" };

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(authz -> 
			authz
				.requestMatchers(WHITE_LIST_URLS)
				.permitAll()
				.anyRequest()
				.authenticated()
		)
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.disable());

		return http.build();

	}

}
