import { useEffect, useState } from "react";
import { Breadcrumb, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";

import { Category, Recipe } from "../../../../data/types";
import { BreadCrumpAttrs } from "../../../../data/utilTypes";
import useMyNav from "../../../../hooks/useMyNav";
import { createCategoriesListInOrder } from "../../../../utils/ListUtils";

type Props = {
    recipe: Recipe
};

function BreadCrumbs({
    recipe
}: Props) {

    const { t } = useTranslation();
    const [categories, setCategories] = useState<Category[][]>([]);
    const nav = useMyNav();

    const firstCategory: BreadCrumpAttrs = {
        onClick: onGoToMainPage,
        className: "cursor-pointer",
        text: t("p.breadCrumbsMain"),
        key: "first"
    }
    const lastCategory: BreadCrumpAttrs = {
        onClick: () => { },
        className: "cursor-default",
        text: recipe.name,
        key: "last"
    }
    const getBetweenCategory = (category: Category): BreadCrumpAttrs => ({
        onClick: () => onGoToCategoryFilter(category),
        className: "cursor-pointer",
        text: category.name,
        key: category.name
    })

    useEffect(() => {
        setCategories(createCategoriesListInOrder(recipe.categories));
    }, []);

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
                    {renderBreadcrumbs(categoryRow)}
                </Breadcrumb>
            </Stack>
        )
    }

    function renderBreadcrumbs(categoryRow: Category[]) {
        return (
            <>
                {renderBreadcrumbItem(firstCategory)}
                {categoryRow.map(renderBetween)}
                {renderBreadcrumbItem(lastCategory)}
            </>
        )
    }

    function renderBetween(category: Category) {
        return renderBreadcrumbItem(getBetweenCategory(category))
    }

    function renderBreadcrumbItem({ onClick, className, text, key }: BreadCrumpAttrs) {
        return (
            <Breadcrumb.Item
                active
                onClick={onClick}
                className={className}
                key={key}
            >
                {text}
            </Breadcrumb.Item>)
    }
}

export default BreadCrumbs;