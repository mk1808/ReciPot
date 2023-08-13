import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";

function RecipeAdd() {
    const { t } = useTranslation();
    return (
        <Stack className="justify-content-center py-5 recipe-add-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container-large basic-container-border">
                <MyHeader title={t('p.newRecipeHeader')}></MyHeader>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (<></>);

    }
}

export default RecipeAdd;