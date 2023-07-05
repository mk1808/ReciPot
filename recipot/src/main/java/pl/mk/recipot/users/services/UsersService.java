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
import pl.mk.recipot.users.domains.CheckIfCurrentUser;
import pl.mk.recipot.users.domains.CheckUserExistsForEdit;
import pl.mk.recipot.users.domains.DeleteSensitiveDataFromUser;
import pl.mk.recipot.users.domains.IsNewUser;
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
		boolean isNewUser = new IsNewUser().execute(appUser);
		usersRepository.save(appUser);
		if (isNewUser) {
			recipeCollectionsFacade.initUserDefaultCollections(appUser);
		}
		return appUser;
	}

	@Override
	public AppUser update(AppUser appUser, UUID id) {
		AppUser oldUser = usersRepository.findById(id).orElse(null);
		Boolean userExists = new CheckUserExistsForEdit().execute(oldUser);
		if (userExists) {
			return updateAndSaveUser(oldUser, appUser);
		}

		return null;
	}

	@Override
	public AppUser get(UUID id) {
		return usersRepository.findById(id).get();
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub

	}

	@Override
	public Role getRoleByName(RoleType name) {
		return rolesRepository.getByName(name);
	}

	private AppUser updateAndSaveUser(AppUser oldUser, AppUser appUser) {
		Boolean isCurrentUser = new CheckIfCurrentUser().execute(authFacade.getCurrentUser(), oldUser);
		if (isCurrentUser) {
			AppUser updatedUser = new UpdateUser().execute(oldUser, appUser);
			AppUser userAfterSave = usersRepository.save(updatedUser);
			return new DeleteSensitiveDataFromUser().execute(userAfterSave);
		}
		return null;
	}

	@Override
	public int getAllUsersCount() {
		return usersRepository.getAllUsersCount();
	}

}
