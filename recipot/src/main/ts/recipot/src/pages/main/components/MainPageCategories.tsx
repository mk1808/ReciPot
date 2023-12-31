import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MyHeader from "../../../components/basicUi/MyHeader";
import CategoryCard from "../../../components/complex/CategoryCard";
import { CategoryDto } from "../../../data/types";
import useCategories from "../../../hooks/useCategories";
import useMyNav from "../../../hooks/useMyNav";

function CategoryCards() {
    const [, , allCategories] = useCategories();
    const nav = useMyNav();
    const onCategoryClick = (category: CategoryDto) => nav.goToCategoryFilters(category);

    return (
        <div className="categories-container">
            <Stack direction="horizontal" className="flex-wrap align-items-stretch justify-content-center mt-4 py-4 categories-row" >
                {allCategories.map(renderCard)}
            </Stack>
        </div>
    )

    function renderCard(singleRow: CategoryDto) {
        return (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={singleRow.id}>
                <CategoryCard
                    category={singleRow}
                    className="h-100"
                    key={singleRow.id}
                    onCategorySelect={onCategoryClick}
                />
            </div>
        );
    }
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