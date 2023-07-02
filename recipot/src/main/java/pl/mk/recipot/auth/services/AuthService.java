package pl.mk.recipot.auth.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.configs.JwtUserDetails;
import pl.mk.recipot.auth.domains.CheckIfPasswordsMatch;
import pl.mk.recipot.auth.domains.CheckIfUserExists;
import pl.mk.recipot.auth.domains.CheckIfUserExistsForRegistration;
import pl.mk.recipot.auth.domains.CreateUser;
import pl.mk.recipot.auth.domains.UpdateUserPassword;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.users.domains.CheckIfCurrentUser;
import pl.mk.recipot.users.facades.IUsersFacade;

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
		new CheckIfPasswordsMatch().execute(userRegisterDto, null);

		AppUser existingUser = usersFacade.getUserByLogin(userRegisterDto.login);
		new CheckIfUserExistsForRegistration().execute(existingUser);

		Role role = usersFacade.getRoleByName("USER");
		AppUser newUser = new CreateUser().execute(userRegisterDto, role, passwordEncoder);
		return usersFacade.save(newUser);
	}

	@Override
	public AppUser getCurrentUser() {
		return ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
	}

	@Override
	public void changePassword(ChangePasswordDto changePasswordDto) {
		new CheckIfPasswordsMatch().execute(null, changePasswordDto);
		
		AppUser existingUser = usersFacade.getUserById(changePasswordDto.userId);
		new CheckIfUserExists().execute(existingUser);
		new CheckIfCurrentUser().execute(getCurrentUser(), existingUser);
		AppUser updatedUser = new UpdateUserPassword().execute(existingUser, changePasswordDto, passwordEncoder);
		usersFacade.save(updatedUser);
		
	}

}
