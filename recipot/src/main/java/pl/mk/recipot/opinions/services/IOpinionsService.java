package pl.mk.recipot.opinions.services;

import java.util.List;
import java.util.UUID;

import pl.mk.recipot.opinions.dtos.OpinionDto;

public interface IOpinionsService {
	List<OpinionDto> getRecipeOpinions(UUID recipeId);
}
