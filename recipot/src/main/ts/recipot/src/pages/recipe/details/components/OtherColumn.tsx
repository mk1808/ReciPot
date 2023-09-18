import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dictionariesApi from "../../../../api/DictionariesApi";
import { CategoryDto, Recipe, Response } from "../../../../data/types";
import RecipeCard from "../../../../components/complex/RecipeCard";
import { initAs } from "../../../../utils/ObjectUtils";
import CategoryCard from "../../../../components/complex/CategoryCard";

function OtherColumn({ recipes }: { recipes: Recipe[] }) {
    const { t } = useTranslation();
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
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
            <CategoryCard category={category} showChildren={false} className="category-no-border" key={key} />
        )
    }
    function renderRecipes() {
        return (
            <div className="list">
                {recipes.map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} recipeCallback={() => { }} key={index}></RecipeCard >
                    )
                })}
            </div>
        )
    }

}

export default OtherColumn;