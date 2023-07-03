package pl.mk.recipot.recipecollections.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkResponseFactory;
import pl.mk.recipot.commons.models.RecipeCollection;
import pl.mk.recipot.commons.models.RecipeCollectionItem;
import pl.mk.recipot.commons.services.ICrudService;
import pl.mk.recipot.recipecollections.services.IRecipeCollectionsService;

@RestController
public class RecipeCollectionsController implements IRecipeCollectionsController {
	
	private ICrudService<RecipeCollection> recipeCollectionCrudService;
	private IRecipeCollectionsService recipeCollectionsService;
	public RecipeCollectionsController(ICrudService<RecipeCollection> recipeCollectionCrudService,
			IRecipeCollectionsService recipeCollectionsService) {
		super();
		this.recipeCollectionCrudService = recipeCollectionCrudService;
		this.recipeCollectionsService = recipeCollectionsService;
	}
	
	@Override
	public ResponseEntity<Response<RecipeCollection>> create(RecipeCollection recipeCollection) {
		return new CreatedResponseFactory().createResponse(recipeCollectionCrudService.save(recipeCollection));
	}

	@Override
	public ResponseEntity<Response<RecipeCollectionItem>> addItem(UUID collectionId,
			RecipeCollectionItem recipeCollectionItem) {
		return new CreatedResponseFactory().createResponse(recipeCollectionsService.addItem(collectionId, recipeCollectionItem));
  }
  
	@Override
	public ResponseEntity<Response<RecipeCollection>> get(UUID id) {
		return new OkResponseFactory().createResponse(recipeCollectionCrudService.get(id));

	}
	
	

}
