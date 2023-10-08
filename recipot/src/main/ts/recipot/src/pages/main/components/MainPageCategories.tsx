import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, CategoryDto, Response } from "../../../data/types";
import dictionariesApi from "../../../api/DictionariesApi";
import CategoryCard from "../../../components/complex/CategoryCard";
import { useNavigate } from "react-router-dom";
import { goToFilters } from "../../../utils/NavigationUtils";
import MyHeader from "../../../components/basicUi/MyHeader";

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
    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<any[]>) => {
            let categories = response.value;
            setAllCategories(categories);
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
                <MyHeader title={t('p.categories')} level="2" dispLevel="3" />
            </Stack>
            <CategoryCards />
        </div>
    );
}

export default MainPageCategories;