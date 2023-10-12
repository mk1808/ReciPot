import { useTranslation } from "react-i18next";
import MyCollapse from "../../../../components/basicUi/MyCollapse";
import MyHeader from "../../../../components/basicUi/MyHeader";
import RecipesSortForm from "./RecipesSortForm";
import RecipeFiltersForm from "./RecipeFiltersForm";


function SortAndFiltersColumn() {
    const { t } = useTranslation();

    return (
        <>
            <div className="show-lg">
                <MyCollapse header={t("p.filtersAndSort")}>
                    {renderFiltersColumn()}
                </MyCollapse>
            </div>
            <div className="hide-lg full-height filter-column-width">
                {renderFiltersColumn()}
            </div>
        </>
    );

    function renderFiltersColumn() {
        return (
            <div className='basic-container-border full-height'>
                <MyHeader title={t('p.recipesSort')} level="6" className='mt-6' />
                <RecipesSortForm />
                <hr />
                <MyHeader title={t('p.recipeFilterForm')} level="6" className='mt-6' />
                <RecipeFiltersForm />
            </div>
        );
    }

}

export default SortAndFiltersColumn;