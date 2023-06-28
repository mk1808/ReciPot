package pl.mk.recipot.auth.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.domains.CheckUser;
import pl.mk.recipot.auth.domains.CreateUser;
import pl.mk.recipot.auth.domains.PasswordsMatch;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;
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
		CheckUser checkUser = new CheckUser();
		CreateUser createUser = new CreateUser();
		PasswordsMatch passwordMatch = new PasswordsMatch();
		
		passwordMatch.execute(userRegisterDto);
		AppUser existingUser = usersFacade.getUserByLogin(userRegisterDto.login);
		checkUser.execute(existingUser);
		AppUser newUser = createUser.execute(userRegisterDto, passwordEncoder.encode(userRegisterDto.password));
		return usersFacade.save(newUser);
	}

}
