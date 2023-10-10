import { useContext, useEffect } from "react";
import { RecipeCollectionListContext, RecipeCollectionListContextType, RecipeCollectionListDispatchContext } from "../context/RecipeCollectionListContext";
import VerticalPagination from "../../../../components/complex/VerticalPagination";

function CollectionRecipesPagination() {
    const collectionsContext = useContext(RecipeCollectionListContext);
    const collectionsDispatchContext = useContext(RecipeCollectionListDispatchContext);

    useEffect(() => {
        const pageId = "recipesPage_" + collectionsContext.currentPage?.number;
        document.getElementById(pageId)?.scrollIntoView();
    }, [collectionsContext.currentPage?.number])

    function onPageSelect(page: number) {
        collectionsDispatchContext({
            type: RecipeCollectionListContextType.LoadRecipesPage,
            value: page
        })
    }

    return (
        <VerticalPagination
            totalPages={collectionsContext.currentPage?.totalPages || 0}
            actualPage={collectionsContext.currentPage?.number || 0}
            pageButtonsToShow={6}
            onPageSelect={onPageSelect}
        />
    );

}

export default CollectionRecipesPagination;