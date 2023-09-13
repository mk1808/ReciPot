import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import RecipeAddForm from "./components/RecipeAddForm";
import AddRecipeContextProvider from "../../../context/AddRecipeContext";

function RecipeAdd() {
    const { t } = useTranslation();
    return (
        <AddRecipeContextProvider>
            <Form noValidate validated={true}>
                <Stack className="justify-content-center py-5 recipe-add-page" direction="horizontal">
                    <div className="pt-4 mb-2 basic-container-large basic-container-border">

                        <MyHeader title={t('p.newRecipeHeader')}></MyHeader>
                        <RecipeAddForm></RecipeAddForm>

                    </div>
                </Stack>
            </Form>
        </AddRecipeContextProvider>
    );
}

export default RecipeAdd;