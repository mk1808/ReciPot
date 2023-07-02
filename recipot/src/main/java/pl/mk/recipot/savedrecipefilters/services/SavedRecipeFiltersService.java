package pl.mk.recipot.savedrecipefilters.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeFilter;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.savedrecipefilters.domains.CheckIfRecipeFilterExists;
import pl.mk.recipot.savedrecipefilters.domains.FillRecipeFilterOwnerAndCreationDate;
import pl.mk.recipot.savedrecipefilters.repositories.ISavedRecipeFiltersRepository;

@Service
public class SavedRecipeFiltersService implements ISavedRecipeFiltersService, ICrudService<RecipeFilter> {

	private ISavedRecipeFiltersRepository savedRecipeFiltersRepository;
	private IAuthFacade authFacade;

	public SavedRecipeFiltersService(ISavedRecipeFiltersRepository savedRecipeFiltersRepository,
			IAuthFacade authFacade) {
		super();
		this.savedRecipeFiltersRepository = savedRecipeFiltersRepository;
		this.authFacade = authFacade;
	}

	@Override
	public RecipeFilter save(RecipeFilter recipeFilter) {
		AppUser currentUser = authFacade.getCurrentUser();
		new CheckIfRecipeFilterExists()
				.execute(savedRecipeFiltersRepository.findByUserAndName(currentUser, recipeFilter.getName()));
		new FillRecipeFilterOwnerAndCreationDate().execute(recipeFilter, currentUser);
		return savedRecipeFiltersRepository.save(recipeFilter);
	}

	@Override
	public RecipeFilter update(RecipeFilter obj, UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public RecipeFilter get(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public void delete(UUID id) {
		throw new UnsupportedOperationException();
	}

}
