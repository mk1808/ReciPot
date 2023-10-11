import { useContext, useEffect } from "react";
import VerticalPagination from "../../../../components/complex/VerticalPagination";
import { RecipeFilterContext, RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { scrollIntoRecipesPage } from "../../../../utils/RecipeSearchUtils";

function FilteredRecipesPagination() {
    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    useEffect(() => {
        scrollIntoRecipesPage(recipeFilterContext.currentPage?.number || 0);
    }, [recipeFilterContext.currentPage?.number])

    function onPageSelect(page: number) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.LoadRecipesPage,
            value: page
        })
    }

    return (
        <VerticalPagination
            totalPages={recipeFilterContext.currentPage?.totalPages || 0}
            actualPage={recipeFilterContext.currentPage?.number || 0}
            pageButtonsToShow={6}
            onPageSelect={onPageSelect}
        />
    );
}

export default FilteredRecipesPagination;