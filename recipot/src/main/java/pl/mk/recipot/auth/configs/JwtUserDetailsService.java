package pl.mk.recipot.auth.configs;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.users.services.UsersService;

@Service
public class JwtUserDetailsService implements UserDetailsService { 
	private UsersService usersService;
	
	public JwtUserDetailsService(UsersService usersService) {
		super();
		this.usersService = usersService;
	}
  /*@Override 
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
     // if ("randomuser123".equals(username)) { 
    	  AppUser appUser = usersService.getUserByLogin(username);
    	 /* User user = new User(appUser.getLogin(), 
    			  appUser.getPassword(), 
            new ArrayList<>()); 
            return user;
          // return new JwtUserDetails(appUser);
      if (appUser != null) {
			return new User(appUser.getLogin(), appUser.getPassword(), new ArrayList<>());
      } else { 
         throw new UsernameNotFoundException("User not found with username: " + username); 
      } 
   } */
   
   
	@Override
	public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = usersService.getUserByLogin(username);
		if (appUser != null) {
			return new JwtUserDetails(appUser);
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}
