import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, CategoryDto, Response } from "../../../data/types";
import dictionariesApi from "../../../api/DictionariesApi";
import CategoryCard from "../../../components/complex/CategoryCard";
import MyButton from "../../../components/basicUi/MyButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { createUrl } from "../../../utils/RecipeSearchUtils";
import { useNavigate } from "react-router-dom";
import { goToFilters } from "../../../utils/NavigationUtils";

function CategoryCards() {
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [readyCategories, setReadyCategorires] = useState<any[]>([]);
    const navigate = useNavigate();
    const numInRow = 3;
    const onCategoryClick = (category: CategoryDto) => {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] }, navigate);
    }
    function setCategoriesInRows(categories: Category[]) {
        let newTab = [...readyCategories];
        let noOfRows = Math.ceil(categories.length / numInRow);
        for (let i = 0; i < noOfRows; i++) {
            newTab.push(categories.slice(i * numInRow, i * numInRow + numInRow));
        }
        setReadyCategorires(newTab);
    }
    function prepareCategories(response: Response<Category[]>) {
        let categories = response.value;
        categories.push(categories[0]);
        categories.push(categories[1]);
        categories.push(categories[2]);
        setAllCategories(categories);
        return categories;
    }
    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            let categories = prepareCategories(response);

            setCategoriesInRows(categories);
        })
    }, [])
    return (
        <Stack direction="horizontal" className=" flex-wrap align-items-stretch justify-content-center my-5 categories-row" >
            {allCategories.map((singleRow: CategoryDto) =>
                <div className="col-lg-4 col-md-6 col-12 p-2" key={singleRow.id}>
                    <CategoryCard category={singleRow} className="h-100" key={singleRow.id} onCategorySelect={onCategoryClick} />
                </div>
            )}
        </Stack>
    )
}

function MainPageCategories() {
    const { t } = useTranslation();

    return (
        <div className="categories-section">
            <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                <h2 className="my-3 display-3">{t('p.categories')}</h2>
            </Stack>
            <CategoryCards />
        </div>
    );
}

export default MainPageCategories;