import { Form, Stack } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useContext, useState } from "react";
import MyButton from "../../../../components/basicUi/MyButton";
import AddRecipeFilterDialog from "../dialogs/AddRecipeFilterDialog";
import { RecipeFilterContextType, RecipeFilterDispatchContext } from "../context/RecipeFilterContext";
import { UsersContext } from "../../../../context/UserContext";
import RecipeFilterControls from "./RecipeFilterControls";

function RecipeFiltersForm() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const recipeFilterDispatchContext = useContext(RecipeFilterDispatchContext);
    const user = useContext(UsersContext);

    function handleSubmit(event: any) {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.Filter
        })
    };

    function clearFilter() {
        recipeFilterDispatchContext({
            type: RecipeFilterContextType.ClearFilterForm
        })
    }

    return (
        <Form>
            <Stack className="p-5 text-start" gap={3}>
                {renderClearFiltersButton()}
                <RecipeFilterControls />
                {renderButtons()}
            </Stack>
        </Form>
    );

    function renderButtons() {
        return (
            <>
                <MyButton.Primary onClick={handleSubmit}>{t('p.search')}</MyButton.Primary >
                {renderSaveFilterButton()}
            </>
        )
    }

    function renderSaveFilterButton() {
        const isUserLogged = !!user;
        return isUserLogged && (
            <>
                <MyButton.Secondary onClick={() => setShowModal(true)} >
                    {t('p.saveRecipeFilter')}
                </MyButton.Secondary>
                <AddRecipeFilterDialog showModal={showModal} onClose={() => setShowModal(false)} />
            </>
        )
    }

    function renderClearFiltersButton() {
        return (
            <MyButton.Secondary onClick={clearFilter} >
                {t('p.clearFilters')}
            </MyButton.Secondary>
        );
    }
}

export default RecipeFiltersForm;