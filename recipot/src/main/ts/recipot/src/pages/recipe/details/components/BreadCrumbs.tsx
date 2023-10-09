import { useEffect, useState } from "react";
import { Breadcrumb, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, Recipe } from "../../../../data/types";
import { FaArrowRight } from "react-icons/fa";
import useMyNav from "../../../../hooks/useMyNav";

type Props = {
    recipe: Recipe
};

function BreadCrumbs({
    recipe
}: Props) {

    const { t } = useTranslation();
    const nav = useMyNav();
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

    function onGoToMainPage() {
        nav.toMain();
    }

    function onGoToCategoryFilter(category: Category) {
        nav.goToCategoryFilters(category);
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
                    <Breadcrumb.Item active onClick={onGoToMainPage} className="cursor-pointer">{t("p.breadCrumbsMain")}</Breadcrumb.Item>
                    {categoryRow.map((category) => { return <Breadcrumb.Item active key={category.name} className="cursor-pointer" onClick={() => onGoToCategoryFilter(category)}>{category.name}</Breadcrumb.Item> })}
                    <Breadcrumb.Item active className="cursor-default">{recipe.name}</Breadcrumb.Item>
                </Breadcrumb>
            </Stack>
        )
    }
}

export default BreadCrumbs;