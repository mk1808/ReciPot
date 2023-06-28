package pl.mk.recipot.users.services;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.users.repositories.IUsersRepository;

public class UsersService implements IUsersService {

	private IUsersRepository usersRepository;
	
	public UsersService(IUsersRepository usersRepository) {
		super();
		this.usersRepository = usersRepository;
	}

	@Override
	public AppUser getUserByLogin(String login) {
		return usersRepository.getByLogin(login);
	}

	@Override
	public <AppUser> AppUser save(AppUser appUser) {
		return usersRepository.save(appUser);
	}

	@Override
	public <T> T update(T obj, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> T get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

}
