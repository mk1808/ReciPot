package pl.mk.recipot.auth.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.domains.CheckIfUserExistsForRegistration;
import pl.mk.recipot.auth.domains.CreateUser;
import pl.mk.recipot.auth.domains.CheckIfPasswordsMatch;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.users.facades.IUsersFacade;
import pl.mk.recipot.users.repositories.IUsersRepository;

@Service
public class AuthService implements IAuthService {
	
	private IUsersFacade usersFacade;
	private PasswordEncoder passwordEncoder;
	
	public AuthService(IUsersFacade usersFacade, PasswordEncoder passwordEncoder) {
		super();
		this.usersFacade = usersFacade;
		this.passwordEncoder = passwordEncoder;

	}

	@Override
	public AppUser register(UserRegisterDto userRegisterDto) {
		new CheckIfPasswordsMatch().execute(userRegisterDto);
		
		AppUser existingUser = usersFacade.getUserByLogin(userRegisterDto.login);
		new CheckIfUserExistsForRegistration().execute(existingUser);
		
		Role role = usersFacade.getRoleByName("USER");
		AppUser newUser = new CreateUser().execute(userRegisterDto, role, passwordEncoder);
		return usersFacade.save(newUser);
	}

}
