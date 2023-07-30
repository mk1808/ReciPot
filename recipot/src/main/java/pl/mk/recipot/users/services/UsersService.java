package pl.mk.recipot.users.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.facades.IRecipeCollectionsFacade;
import pl.mk.recipot.users.domains.CheckIfUserDoesNotExists;
import pl.mk.recipot.users.domains.CheckIfUsersNotTheSame;
import pl.mk.recipot.users.domains.CleanSensitiveDataInUser;
import pl.mk.recipot.users.domains.GetIsNewUser;
import pl.mk.recipot.users.domains.UpdateUser;
import pl.mk.recipot.users.repositories.IRolesRepository;
import pl.mk.recipot.users.repositories.IUsersRepository;

@Service
@Slf4j
public class UsersService implements IUsersService, ICrudService<AppUser> {

	private IUsersRepository usersRepository;
	private IRolesRepository rolesRepository;
	private IRecipeCollectionsFacade recipeCollectionsFacade;
	private IAuthFacade authFacade;

	public UsersService(IUsersRepository usersRepository, IRolesRepository rolesRepository, IAuthFacade authFacade,
			IRecipeCollectionsFacade recipeCollectionsFacade) {
		super();
		this.usersRepository = usersRepository;
		this.rolesRepository = rolesRepository;
		this.authFacade = authFacade;
		this.recipeCollectionsFacade = recipeCollectionsFacade;
	}

	@Override
	public AppUser getUserByLogin(String login) {
		return usersRepository.getByLogin(login);
	}

	@Override
	public AppUser save(AppUser appUser) {
		boolean isNewUser = new GetIsNewUser().execute(appUser);
		usersRepository.save(appUser);
		if (isNewUser) {
			recipeCollectionsFacade.initUserDefaultCollections(appUser);
		}
		return appUser;
	}

	@Override
	public AppUser update(AppUser appUser, UUID id) {
		AppUser oldUser = usersRepository.findById(id).orElse(null);
		new CheckIfUserDoesNotExists().execute(oldUser);
		return updateAndSaveUser(oldUser, appUser);
	}

	@Override
	public AppUser get(UUID id) {
		return usersRepository.findById(id).get();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Role getRoleByName(RoleType name) {
		return rolesRepository.getByName(name);
	}

	@Override
	public int getAllUsersCount() {
		return usersRepository.getAllUsersCount();
	}
	
	private AppUser updateAndSaveUser(AppUser oldUser, AppUser appUser) {
		new CheckIfUsersNotTheSame().execute(authFacade.getCurrentUser(), oldUser);
		AppUser updatedUser = new UpdateUser().execute(oldUser, appUser);
		AppUser userAfterSave = usersRepository.save(updatedUser);
		return new CleanSensitiveDataInUser().execute(userAfterSave);
	}

}
