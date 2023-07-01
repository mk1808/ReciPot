package pl.mk.recipot.users.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.Role;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.users.repositories.IRolesRepository;
import pl.mk.recipot.users.repositories.IUsersRepository;

@Service
public class UsersService implements IUsersService, ICrudService<AppUser> {

	private IUsersRepository usersRepository;
	private IRolesRepository rolesRepository;
	
	public UsersService(IUsersRepository usersRepository, IRolesRepository rolesRepository) {
		super();
		this.usersRepository = usersRepository;
		this.rolesRepository = rolesRepository;
	}

	@Override
	public AppUser getUserByLogin(String login) {
		return usersRepository.getByLogin(login);
	}

	@Override
	public AppUser save(AppUser appUser) {
		return usersRepository.save(appUser);
	}

	@Override
	public AppUser update(AppUser obj, UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AppUser get(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(UUID id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Role getRoleByName(String name) {
		return rolesRepository.getByName(name);
	}

}
