package pl.mk.recipot.auth.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.configs.JwtUserDetails;
import pl.mk.recipot.auth.domains.CheckIfPasswordsDoNotMatch;
import pl.mk.recipot.auth.domains.CheckIfUserExists;
import pl.mk.recipot.auth.domains.CreateUser;
import pl.mk.recipot.auth.domains.UpdateUserPassword;
import pl.mk.recipot.commons.domains.CheckIfUserDoesNotExists;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.users.domains.CheckIfUsersNotTheSame;
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
		new CheckIfPasswordsDoNotMatch().execute(userRegisterDto);

		AppUser existingUser = usersFacade.getUserByLogin(userRegisterDto.login);
		new CheckIfUserExists().execute(existingUser);

		Role role = usersFacade.getRoleByName(RoleType.USER);
		AppUser newUser = new CreateUser().execute(userRegisterDto, role, passwordEncoder);
		return usersFacade.save(newUser);
	}

	@Override
	public AppUser getCurrentUser() {
		return ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
	}

	@Override
	public void changePassword(ChangePasswordDto changePasswordDto) {
		new CheckIfPasswordsDoNotMatch().execute(changePasswordDto);

		AppUser existingUser = usersFacade.getUserById(changePasswordDto.userId);
		new CheckIfUserDoesNotExists().execute(existingUser);
		new CheckIfUsersNotTheSame().execute(getCurrentUser(), existingUser);
		AppUser updatedUser = new UpdateUserPassword().execute(existingUser, changePasswordDto, passwordEncoder);
		usersFacade.save(updatedUser);
	}
}
