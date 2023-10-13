import { useTranslation } from "react-i18next";
import MyCollapse from "../../../../components/basicUi/MyCollapse";
import SideOffcanvas from "../../../../components/basicUi/SideOffcanvas";
import SavedRecipeFilters from "./SavedRecipeFilters";
import { UsersContext } from '../../../../context/UserContext';
import { useContext } from 'react';


function SavedRecipeFiltersColumn() {
    const { t } = useTranslation();
    const user = useContext(UsersContext);

    if (!user) {
        return <></>
    }

    return (
        <>
            <div className="show-lg">
                <MyCollapse header={t("p.savedRecipeFilterHeader")}>
                    <SavedRecipeFilters />
                </MyCollapse>
            </div>
            <div className="hide-lg">
                {renderSavedFiltersColumn()}
            </div>
        </>
    );

    function renderSavedFiltersColumn() {
        return (
            <SideOffcanvas title={t('p.savedRecipeFilterHeader')}>
                <SavedRecipeFilters />
            </SideOffcanvas>
        )
    }
}

export default SavedRecipeFiltersColumn;