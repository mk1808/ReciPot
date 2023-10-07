import { useEffect, useState } from "react";
import { Breadcrumb, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, Recipe } from "../../../../data/types";
import { useNavigate } from "react-router-dom";
import { goToFilters } from "../../../../utils/NavigationUtils";
import { FaArrowRight } from "react-icons/fa";

function BreadCrumbs({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[][]>([]);

    useEffect(() => {
        createCategories();
    }, []);

    function createCategories() {
        const allCategories: Category[][] = [];
        recipe.categories.forEach(category => {
            const categoriesTab: Category[] = [category];
            while (category.parentCategory != null) {
                categoriesTab.push(category.parentCategory);
                category = category.parentCategory;
            }
            categoriesTab.reverse();
            allCategories.push(categoriesTab);
        })
        setCategories(allCategories);
    }

    function goToMainPage() {
        navigate("/");
    }

    function goToCategoryFilter(category: Category) {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] }, navigate);
    }

    return (
        <div className="mt-4 breadcrumps">
            {categories.map(renderCategoryRow)}
        </div>
    )

    function renderCategoryRow(categoryRow: Category[], index: number) {
        return (
            <Stack direction="horizontal" gap={3} key={index}>
                <FaArrowRight />
                <Breadcrumb className="mb-1">
                    <Breadcrumb.Item active onClick={goToMainPage} className="cursor-pointer">{t("p.breadCrumbsMain")}</Breadcrumb.Item>
                    {categoryRow.map((category) => { return <Breadcrumb.Item active key={category.name} className="cursor-pointer" onClick={() => goToCategoryFilter(category)}>{category.name}</Breadcrumb.Item> })}
                    <Breadcrumb.Item active className="cursor-default">{recipe.name}</Breadcrumb.Item>
                </Breadcrumb>
            </Stack>
        )
    }
}

export default BreadCrumbs;