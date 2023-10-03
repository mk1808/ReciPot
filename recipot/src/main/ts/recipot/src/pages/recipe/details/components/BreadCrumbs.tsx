import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Category, Recipe } from "../../../../data/types";
import { useNavigate } from "react-router-dom";
import { goToFilters } from "../../../../utils/NavigationUtils";

function BreadCrumbs({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        createCategories();
    }, []);

    function createCategories() {
        let current = recipe.categories[0],
            categoriesTab: Category[] = [];
        categoriesTab.push(current);
        while (current.parentCategory != null) {
            categoriesTab.push(current.parentCategory);
            current = current.parentCategory;
        }
        categoriesTab.reverse();
        setCategories(categoriesTab);
    }

    function goToMainPage() {
        navigate("/");
    }

    function goToCategoryFilter(category: Category) {
        goToFilters({ categories: [{ value: { id: category.id }, label: category.name }] }, navigate);
    }

    return (
        <div className="my-4 breadcrumps">
            <Breadcrumb>
                <Breadcrumb.Item active onClick={goToMainPage} className="cursor-pointer">{t("p.breadCrumbsMain")}</Breadcrumb.Item>
                {categories.map((category) => { return <Breadcrumb.Item active key={category.name} className="cursor-pointer" onClick={() => goToCategoryFilter(category)}>{category.name}</Breadcrumb.Item> })}
                <Breadcrumb.Item active className="cursor-default">{recipe.name}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumbs;