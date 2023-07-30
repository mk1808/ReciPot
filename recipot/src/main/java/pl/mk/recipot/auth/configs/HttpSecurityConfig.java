package pl.mk.recipot.auth.configs;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
public class HttpSecurityConfig extends AbstractHttpConfigurer<HttpSecurityConfig, HttpSecurity> {

	private JwtFilter filter;

	public HttpSecurityConfig(JwtFilter filter) {
		super();
		this.filter = filter;
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
		http.addFilter(new UsernamePasswordAuthenticationFilter(authenticationManager));
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

	}
}