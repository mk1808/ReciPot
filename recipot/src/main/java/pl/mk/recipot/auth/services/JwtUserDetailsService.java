package pl.mk.recipot.auth.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.users.services.UsersService;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	private UsersService usersService;

	public JwtUserDetailsService(UsersService usersService) {
		super();
		this.usersService = usersService;
	}

	@Override
	public JwtUserDetailsDto loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = usersService.getUserByLogin(username);
		if (appUser != null) {
			return new JwtUserDetailsDto(appUser);
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}
