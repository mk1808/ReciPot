package pl.mk.recipot.auth.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class WebSecurityConfig {
	private static final String[] WHITE_LIST_URLS = { "/api/auth/register" };

	private JwtAuthenticationEntryPoint authenticationEntryPoint;
	private UserDetailsService userDetailsService;
	private HttpSecurityConfig httpSecurityConfig;

	public WebSecurityConfig(JwtAuthenticationEntryPoint authenticationEntryPoint,
			UserDetailsService userDetailsService, HttpSecurityConfig httpSecurityConfig) {
		super();
		this.authenticationEntryPoint = authenticationEntryPoint;
		this.userDetailsService = userDetailsService;
		this.httpSecurityConfig = httpSecurityConfig;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	}

	@Bean
	public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder);

		return new ProviderManager(authenticationProvider);
	}

	@Bean
	public HttpSessionSecurityContextRepository securityContextRepository() {
		return new HttpSessionSecurityContextRepository();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/login3");
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				authz -> authz.requestMatchers(WHITE_LIST_URLS).permitAll().anyRequest().authenticated())
				.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
				.exceptionHandling(
						exceptionHandling -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint))
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.apply(httpSecurityConfig);

		return http.build();
	}

}
