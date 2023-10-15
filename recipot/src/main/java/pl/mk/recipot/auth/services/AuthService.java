package pl.mk.recipot.auth.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import pl.mk.recipot.auth.domains.CheckIfPasswordsDoNotMatch;
import pl.mk.recipot.auth.domains.CheckIfUserExists;
import pl.mk.recipot.auth.domains.CreateToken;
import pl.mk.recipot.auth.domains.CreateUser;
import pl.mk.recipot.auth.domains.UpdateUserPassword;
import pl.mk.recipot.auth.dtos.JwtUserDetailsDto;
import pl.mk.recipot.commons.domains.CheckIfUserDoesNotExists;
import pl.mk.recipot.commons.dtos.ChangePasswordDto;
import pl.mk.recipot.commons.dtos.JWTDto;
import pl.mk.recipot.commons.dtos.UserLoginDto;
import pl.mk.recipot.commons.dtos.UserRegisterDto;
import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.exceptions.UnauthorizedException;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.users.domains.CheckIfUsersNotTheSame;
import pl.mk.recipot.users.facades.IUsersFacade;

@Service
public class AuthService implements IAuthService {

	private final IUsersFacade usersFacade;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUserDetailsService userDetailsService;
	private final ITokenManagerService tokenManagerService;

	public AuthService(IUsersFacade usersFacade, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtUserDetailsService userDetailsService, ITokenManagerService tokenManagerService) {
		super();
		this.usersFacade = usersFacade;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.tokenManagerService = tokenManagerService;
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
		return ((JwtUserDetailsDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
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

	@Override
	public JWTDto login(UserLoginDto userLogin, HttpServletResponse response) {
		authenticate(userLogin);
		JwtUserDetailsDto userDetails = userDetailsService.loadUserByUsername(userLogin.getUsername());
		String jwtToken = tokenManagerService.generateJwtToken(userDetails); 
		return new JWTDto(jwtToken);
	}
	
	private void authenticate(UserLoginDto userLogin) {
		try {
			authenticationManager.authenticate(new CreateToken().execute(userLogin));
		} catch (DisabledException e) {
			throw new UnauthorizedException("auth.error.userDisabled");
		} catch (BadCredentialsException e) {
			throw new UnauthorizedException("auth.error.loginNotCorrect");
		}
	}
}
