import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Recipe, Response } from "../../../../data/types";
import RecipeCard from "../../../../components/complex/RecipeCard";
import CategoryCard from "../../../../components/complex/CategoryCard";
import { forwardRef } from "react";
import MyHeader from "../../../../components/basicUi/MyHeader";
import useMyNav from "../../../../hooks/useMyNav";

function OtherColumn({ recipes }: { recipes: Recipe[] }) {
    const { t } = useTranslation();
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
    const [loaded, setloaded] = useState<any>(false);
    const [recipeCardHeight, setRecipeCardHeight] = useState<any>();
    const [newRecipes, setNewRecipes] = useState<any[]>(recipes);
    const nav = useMyNav();
    let slicedRecipes = recipes;
    const containerRef = useRef<any>(null);
    const recipeCardRef = useRef<any>(null);
    const categoriesRef = useRef<any>(null);
    const height = containerRef.current?.clientHeight

    const recipeCallback = (recipe: Recipe, event: any,) => nav.openInBackground({ id: recipe.id }, event);
    const onCategoryClick = (category: any) => nav.goToCategoryFilters(category);

    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            setAllCategories(response.value)
        })
        setTimeout(() => { setloaded(true) }, 1000)
    }, [])

    useEffect(() => {
        if (!recipeCardHeight && recipeCardRef.current || recipeCardRef.current?.clientHeight > recipeCardHeight) {
            setRecipeCardHeight(recipeCardRef.current?.clientHeight)
        }
    }, [recipeCardRef.current])

    useEffect(() => {
        let recipesContainerHeight = height - categoriesRef.current.clientHeight;
        let numOfRecipes = Math.floor(recipesContainerHeight / recipeCardHeight);

        slicedRecipes = recipes.slice(0, numOfRecipes);
        setNewRecipes(slicedRecipes)

    }, [loaded, height, recipes, recipeCardHeight])

    return (
        <div className="h-100 other" ref={containerRef}>
            <div className="py-4 categories" ref={categoriesRef}>
                <MyHeader title={t('p.categories')} level="3" dispLevel="4" />
                {renderCategories()}
            </div>
            <hr></hr>
            <div className="py-4 recipes" >
                <MyHeader title={t('p.recipes')} level="3" dispLevel="4" />
                {renderRecipes()}
            </div>
        </div>
    )
    function renderCategories() {
        return (
            <>
                {allCategories.map((category: CategoryDto, index) => {
                    return renderCategory(category, index)
                })}
            </>
        )
    }
    function renderCategory(category: CategoryDto, key: any) {
        return (
            <CategoryCard category={category} showChildren={false} className="category-no-border" key={key} onCategorySelect={() => onCategoryClick(category)} />
        )
    }
    function renderRecipes() {
        return (
            <div className="list mt-1">
                {(newRecipes.length > 0 ? newRecipes : recipes.slice(0, 1)).map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} recipeCallback={recipeCallback} key={index} className="mx-auto mb-3" ref={recipeCardRef} />
                    )
                })}
            </div>
        )
    }

}

export default forwardRef(OtherColumn);