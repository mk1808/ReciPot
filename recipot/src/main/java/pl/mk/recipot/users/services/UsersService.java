package pl.mk.recipot.users.services;

import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.users.repositories.IUsersRepository;

@Service
public class UsersService implements IUsersService, ICrudService<AppUser> {

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
	public AppUser save(AppUser appUser) {
		return usersRepository.save(appUser);
	}

	@Override
	public AppUser update(AppUser obj, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AppUser get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

}