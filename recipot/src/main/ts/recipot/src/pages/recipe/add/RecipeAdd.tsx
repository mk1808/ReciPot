import { Form, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import RecipeAddForm from "./components/RecipeAddForm";
import AddRecipeContextProvider from "../../../context/AddRecipeContext";
import { Recipe } from "../../../data/types";

type Props = {
    recipe?: Recipe | any
};

function RecipeAdd({
    recipe
}: Props) {

    const { t } = useTranslation();
    return (
        <AddRecipeContextProvider editedRecipe={recipe}>
            <Form noValidate validated>
                <Stack className="justify-content-center py-5 recipe-add-page" direction="horizontal">
                    <div className="mb-2 basic-container-large basic-container-border">

                        <MyHeader title={recipe ? recipe.name : t('p.newRecipeHeader')} />
                        <RecipeAddForm />

                    </div>
                </Stack>
            </Form>
        </AddRecipeContextProvider>
    );
}

export default RecipeAdd;