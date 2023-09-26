import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Recipe, Response } from "../../../../data/types";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { initAs } from "../../../../utils/ObjectUtils";
import CategoryCard from "../../../../components/complex/CategoryCard";
import { useNavigate } from "react-router-dom";
import { goToFilters, openInBackground } from "../../../../utils/NavigationUtils";
import { createUrl } from "../../../../utils/RecipeSearchUtils";
import { forwardRef } from "react";

function OtherColumn({ recipes }: { recipes: Recipe[] }) {
    const { t } = useTranslation();
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
    const [loaded, setloaded] = useState<any>(false);
    const [recipeCardHeight, setRecipeCardHeight] = useState<any>();
    const [newRecipes, setNewRecipes] = useState<any[]>(recipes);
    const navigate = useNavigate();
    let slicedRecipes = recipes;
    const containerRef = useRef<any>(null);
    const recipeCardRef = useRef<any>(null);
    const categoriesRef = useRef<any>(null);
    const height = containerRef.current?.clientHeight

    const recipeCallback = (recipe: Recipe, event: any,) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const onCategoryClick = (category: any) => {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] }, navigate);
    }

    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            setAllCategories(response.value)
        })
        setTimeout(() => { setloaded(true) }, 1000)
    }, [])
    
    useEffect(()=>{
        if(!recipeCardHeight && recipeCardRef.current || recipeCardRef.current?.clientHeight > recipeCardHeight){
            setRecipeCardHeight(recipeCardRef.current?.clientHeight)
        }
    },[recipeCardRef.current])

    useEffect(() => {    
        let recipesContainerHeight = height - categoriesRef.current.clientHeight;
        let numOfRecipes = Math.floor(recipesContainerHeight / recipeCardHeight);

        slicedRecipes = recipes.slice(0, numOfRecipes);
        setNewRecipes(slicedRecipes)

    }, [loaded, height, recipes, recipeCardHeight])

    return (
        <div className="h-100 other" ref={containerRef}>
            <div className="py-4 categories" ref={categoriesRef}>
                <h4 className="my-3 display-4">{t('p.categories')}</h4>
                {renderCategories()}
            </div>
            <hr></hr>
            <div className="py-4 recipes" >
                <h4 className="my-3 display-4">{t('p.recipes')}</h4>
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
            <div className="list">
                {(newRecipes.length > 0 ? newRecipes : recipes.slice(0, 1)).map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} recipeCallback={recipeCallback} key={index} className="mx-auto" ref={recipeCardRef} />
                    )
                })}
            </div>
        )
    }

}

export default forwardRef(OtherColumn);