import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, CategoryDto, Response } from "../../../data/types";
import dictionariesApi from "../../../api/DictionariesApi";
import CategoryCard from "../../../components/complex/CategoryCard";
import MyButton from "../../../components/basicUi/MyButton";
import { FaMagnifyingGlass } from "react-icons/fa6";

function CategoryCards() {
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [readyCategories, setReadyCategorires] = useState<any[]>([[]]);
    const numInRow = 3;
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
        dictionariesApi.getAllCategories((response: Response<Category[]>) => {
            let categories = prepareCategories(response);
            
            setCategoriesInRows(categories);
            //setAllCategories(response.value);
        })
    }, [])
    return (
        <>
            {readyCategories.map(readyCategoriesRow => {
                return (
                    <Stack direction="horizontal" gap={3} className="align-items-stretch justify-content-center my-5 categories-row" >
                        {
                            readyCategoriesRow.map((singleRow: CategoryDto) => { return (<CategoryCard category={singleRow} className="col-4" />) })
                        }
                    </Stack>
                )
            })}
        </>
    )
}

function MainPageCategories() {
    const { t } = useTranslation();

    return (
        <div className="categories-section">
            <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                <h2 className="my-3 display-3">{t('p.categories')}</h2>
                <MyButton.Primary className="mt-4" onClick={() => { }}>{t('p.more')} <FaMagnifyingGlass className="ms-3" /> </MyButton.Primary>
            </Stack>
            <CategoryCards />
        </div>
    );
}

export default MainPageCategories;