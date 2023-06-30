package pl.mk.recipot.auth.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
	
	   @Autowired
	   private JwtAuthenticationEntryPoint authenticationEntryPoint;
	   @Autowired
	   private UserDetailsService userDetailsService;
	   
	   //@Autowired
	   //private JwtFilter filter;

	private static final String[] WHITE_LIST_URLS = { "/api/auth/register", "**" };

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	}
	
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/**", "/ignore2");
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
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
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(authz -> 
			authz.anyRequest()
				//.requestMatchers(WHITE_LIST_URLS)
				.anonymous()
				//.anyRequest()
				//.authenticated()

				
			      
		)
	
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.disable());
		http.exceptionHandling((exceptionHandling) ->
			exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));
	
		

		http.apply(MyCustomDsl.customDsl());
		return http.build();

	}

}
