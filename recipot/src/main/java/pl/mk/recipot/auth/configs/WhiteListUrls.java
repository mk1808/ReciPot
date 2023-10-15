package pl.mk.recipot.auth.configs;

import org.springframework.stereotype.Component;

@Component
public class WhiteListUrls {

	public String[] returnGetUrls() {
		return new String[] { 
				"/api/dictionaries/categories", 
				"/api/dictionaries/hashTags",
				"/api/dictionaries/requiredEfforts", 
				"/api/dictionaries/difficulties", 
				"/api/dictionaries/accessTypes",
				"/api/dictionaries/amountOfDishes", 
				"/api/dictionaries/ingredients", 
				"/api/opinions/**",
				"/api/privateNotes/**", 
				"/api/recipes/**", 
				"/api/statistics/general", 
				"/api/logout2",
				"/assets/**"
			};
	}
	
	public String[] returnPostUrls() {
		return new String[] { 
				"/api/recipes/search", 
				"/api/auth/register",
				"/api/files/**"
			};
	}

}
