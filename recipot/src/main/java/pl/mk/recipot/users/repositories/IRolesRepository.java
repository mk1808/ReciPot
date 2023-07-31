package pl.mk.recipot.users.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.mk.recipot.commons.enums.RoleType;
import pl.mk.recipot.commons.models.Role;

@Repository
public interface IRolesRepository extends JpaRepository<Role, UUID> {
	Role getByName(RoleType name);

}
