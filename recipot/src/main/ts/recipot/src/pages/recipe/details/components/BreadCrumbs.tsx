import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";

function BreadCrumbs({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const [categoriesNames, setCategoriesNames] = useState<string[]>([]);

    useEffect(() => {
        createCategoriesNames();
    }, []);

    function createCategoriesNames() {
        let current = recipe.categories[0],
            categoriesTab: string[] = [];
        categoriesTab.push(current.name);
        while (current.parentCategory != null) {
            categoriesTab.push(current.parentCategory.name);
            current = current.parentCategory;
        }
        categoriesTab.reverse();
        setCategoriesNames(categoriesTab);
        console.log(categoriesTab)
    }
    return (
        <div className="my-4 breadcrumps">
            <Breadcrumb>
                <Breadcrumb.Item active>{t("p.breadCrumbsMain")}</Breadcrumb.Item>
                {categoriesNames.map(category => { return <Breadcrumb.Item active key={category}>{category}</Breadcrumb.Item> })}
                <Breadcrumb.Item active>{recipe.name}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumbs;