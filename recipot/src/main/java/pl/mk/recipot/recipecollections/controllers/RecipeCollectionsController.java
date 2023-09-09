package pl.mk.recipot.recipecollections.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import pl.mk.recipot.commons.dtos.Response;
import pl.mk.recipot.commons.factories.CreatedResponseFactory;
import pl.mk.recipot.commons.factories.OkMessageResponseFactory;
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
		return new CreatedResponseFactory()
				.createResponse(recipeCollectionsService.addItem(collectionId, recipeCollectionItem));
	}

	@Override
	public ResponseEntity<Response<RecipeCollection>> get(UUID id) {
		return new OkResponseFactory().createResponse(recipeCollectionCrudService.get(id));

	}

	@Override
	public ResponseEntity<Response<List<RecipeCollection>>> getForUser() {
		return new OkResponseFactory().createResponse(recipeCollectionsService.getForUser());
	}

	@Override
	public ResponseEntity<Response<Void>> deleteFromCollection(UUID collectionId, UUID recipeId) {
		recipeCollectionsService.deleteRecipeFromCollection(collectionId, recipeId);
		return new OkMessageResponseFactory().createResponse("recipeCollections.success.recipeDeletedFromCollection");
	}

	@Override
	public ResponseEntity<Response<Void>> delete(UUID collectionId) {
		recipeCollectionCrudService.delete(collectionId);
		return new OkMessageResponseFactory().createResponse("recipeCollections.success.collectionDeleted");
	}

	@Override
	public ResponseEntity<Response<Page<RecipeCollectionItem>>> getRecipeCollectionRecipes(UUID collectionId,
			int pageNum, int pageSize) {
		PageRequest pageRequest = PageRequest.of(pageNum, pageSize);
		return new OkResponseFactory()
				.createResponse(recipeCollectionsService.findPageByCollection(collectionId, pageRequest));
	}

}
