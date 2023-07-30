package pl.mk.recipot.savedrecipefilters.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import pl.mk.recipot.auth.facades.IAuthFacade;
import pl.mk.recipot.commons.domains.CheckIfUserIsNotOwner;
import pl.mk.recipot.commons.domains.SetUserNull;
import pl.mk.recipot.commons.models.AppUser;
import pl.mk.recipot.commons.models.RecipeFilter;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.savedrecipefilters.domains.CheckIfRecipeFilterDoesNotExists;
import pl.mk.recipot.savedrecipefilters.domains.CheckIfRecipeFilterExists;
import pl.mk.recipot.savedrecipefilters.domains.UpdateOwnerAndCreationDateInRecipeFilter;
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
		new UpdateOwnerAndCreationDateInRecipeFilter().execute(recipeFilter, currentUser);
		savedRecipeFiltersRepository.save(recipeFilter);
		return new SetUserNull().execute(recipeFilter);
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
		RecipeFilter existingRecipeFilter = savedRecipeFiltersRepository.findById(id).orElse(null);
		new CheckIfRecipeFilterDoesNotExists().execute(existingRecipeFilter);
		new CheckIfUserIsNotOwner().execute(authFacade.getCurrentUser(), existingRecipeFilter);
		savedRecipeFiltersRepository.deleteById(id);
	}

	@Override
	public List<RecipeFilter> getUserFilters() {
		List<RecipeFilter> filters = savedRecipeFiltersRepository.findByUser(authFacade.getCurrentUser());
		filters.forEach(new SetUserNull()::execute);
		return filters;
	}

}
