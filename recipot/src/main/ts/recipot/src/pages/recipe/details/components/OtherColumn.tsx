import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Recipe, Response } from "../../../../data/types";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { initAs } from "../../../../utils/ObjectUtils";
import CategoryCard from "../../../../components/complex/CategoryCard";
import { useNavigate } from "react-router-dom";
import { openInBackground } from "../../../../utils/NavigationUtils";
import { createUrl } from "../../../../utils/RecipeSearchUtils";

function OtherColumn({ recipes }: { recipes: Recipe[] }) {
    const { t } = useTranslation();
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe, event: any, ) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const onCategoryClick = (category: any) => {
        let url = createUrl({ categories: [{ value: { id: category.id }, label: category.name }], accessType: 'PUBLIC' });
        navigate(`/recipes/filter${url?.search}`)
    }

    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            setAllCategories(response.value)
        })
    }, [])
    return (
        <div className="h-100 other" >
            <div className="py-4 categories">
                <h4 className="my-3 display-4">{t('p.categories')}</h4>
                {renderCategories()}
            </div>
            <hr></hr>
            <div className="py-4 recipes">
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
            <CategoryCard category={category} showChildren={false} className="category-no-border" key={key} onCategorySelect={() => onCategoryClick(category)}/>
        )
    }
    function renderRecipes() {
        return (
            <div className="list">
                {recipes.map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} recipeCallback={recipeCallback} key={index}></RecipeCard >
                    )
                })}
            </div>
        )
    }

}

export default OtherColumn;