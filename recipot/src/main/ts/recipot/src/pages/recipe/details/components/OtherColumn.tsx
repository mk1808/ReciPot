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

function OtherColumn({ recipes, height }: { recipes: Recipe[], height:any }, ref: any) {
    const { t } = useTranslation();
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
    const [recip, setRecip] = useState<any[]>(recipes);
    const [loaded, setloaded] = useState<any>(false);
    const [nRecipes, setNRecipes] = useState<any[]>(recipes);
    const navigate = useNavigate();
    let slicedRecipes = recipes;
    const containerRef = useRef<any>(null);
    const recipeCardRef = useRef<any>(null);
    const categoriesRef = useRef<any>(null);
    //titleRef.current.value

    const recipeCallback = (recipe: Recipe, event: any,) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const onCategoryClick = (category: any) => {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] }, navigate);
    }

    height = containerRef.current?.clientHeight

    useEffect(() => {
        setRecip(recipes)
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            setAllCategories(response.value)
        })
        console.log(containerRef.current.clientHeight)
        console.log(categoriesRef.current.clientHeight)
        console.log(recipeCardRef)
        setTimeout(()=>{setloaded(true)},1000)
    }, [])
    useEffect(() => {
        console.log(containerRef.current.clientHeight)
        console.log(categoriesRef.current.clientHeight)
        console.log(recipeCardRef.current?.clientHeight)
        //setTimeout(()=>{
        let recipesContainerHeight = height - categoriesRef.current.clientHeight;
        let numOfRecipes = Math.floor(recipesContainerHeight / recipeCardRef.current?.clientHeight);
        
        slicedRecipes = recipes.slice(0, numOfRecipes );
        console.log("SLICED", slicedRecipes,recipeCardRef.current?.clientHeight )
        setNRecipes(slicedRecipes)
        //}, 1000)
       
    }, [loaded, height,recipes ])
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
                {(nRecipes.length>0?nRecipes:recipes.slice(0,1)).map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} recipeCallback={recipeCallback} key={index} className="mx-auto" ref={recipeCardRef} />
                    )
                })}
            </div>
        )
    }

}

export default forwardRef(OtherColumn);