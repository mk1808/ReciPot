import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import MyButton from "../../../components/basicUi/MyButton";
import UpperLeftSide from "./components/UpperLeftSide";
import AddIngredients from "./components/AddIngredients";
import UpperRightSide from "./components/UpperRightSide";
import AddSteps from "./components/AddSteps";

function RecipeAdd() {
    const { t } = useTranslation();
    return (
        <Stack className="justify-content-center py-5 recipe-add-page" direction="horizontal">
            <div className="pt-4 mb-2 basic-container-large basic-container-border">
                <MyHeader title={t('p.newRecipeHeader')}></MyHeader>
                {renderForm()}
                {renderButtons()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div className="my-5">
                <Container>
                    <Row>
                        <Col className="border-right">
                            {renderLeftSide()}
                        </Col>
                        <Col className="border-left">
                            {renderRightSide()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }

    function renderLeftSide() {
        return (
            <>
                <UpperLeftSide></UpperLeftSide>
                <AddIngredients></AddIngredients>
            </>
        )
    }

    function renderRightSide() {
        return (
            <>
                <UpperRightSide></UpperRightSide>
                <AddSteps></AddSteps>
            </>
        )
    }
}

function renderButtons() {
    return (
        <div className="bottom-part">
            <hr></hr>
            <MyButton.Secondary onClick={() => { }}>Anuluj </MyButton.Secondary>
            <MyButton.Primary onClick={() => { }}>Zapisz </MyButton.Primary>
        </div>
    )

}

export default RecipeAdd;

export function renderBasicInput() {
    return (
        <>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
        </>
    )
}
