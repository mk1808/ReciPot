package pl.mk.recipot.users.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.models.AppUser;

@Repository
public interface IUsersRepository extends JpaRepository<AppUser, UUID> {
	AppUser getByLogin(String login);

}
