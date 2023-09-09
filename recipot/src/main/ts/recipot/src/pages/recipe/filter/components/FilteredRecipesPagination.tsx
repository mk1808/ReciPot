import { useContext, useEffect } from "react";
import VerticalPagination from "../../../../components/complex/VerticalPagination";
import { RecipeFilterContext, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";

function FilteredRecipesPagination() {
    const recipeFilterContext = useContext(RecipeFilterContext);
    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);

    useEffect(() => {
        const pageId = "recipesPage_" + recipeFilterContext.currentPage?.number;
        document.getElementById(pageId)?.scrollIntoView();
    }, [recipeFilterContext.currentPage?.number])

    function onPageSelect(page: number) {
        recipeFilterDispatchContext({
            type: 'loadRecipesPage',
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