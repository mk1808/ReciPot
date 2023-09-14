import { useTranslation } from "react-i18next";
import { useContext, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UpperLeftSide from "./UpperLeftSide";
import AddIngredients from "./AddIngredients";
import UpperRightSide from "./UpperRightSide";
import AddSteps from "./AddSteps";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";
import { AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";

function RecipeAddForm() {
    const { t } = useTranslation();
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);

    function onSubmit() {
        addRecipeDispatchContext({
            type: "onSubmit"
        })
    }

    return (
        <>
            {renderForm()}
            {renderButtons()}
        </>
    );

    function renderForm() {
        return (
            <Container className="my-5">
                <Row>
                    <Col className="border-right">
                        {renderLeftSide()}
                    </Col>
                    <Col className="border-left">
                        {renderRightSide()}
                    </Col>
                </Row>
            </Container>
        );
    }

    function renderLeftSide() {
        return (
            <>
                <UpperLeftSide ></UpperLeftSide>
                <AddIngredients  ></AddIngredients>
            </>
        )
    }

    function renderRightSide() {
        return (
            <>
                <UpperRightSide ></UpperRightSide>
                <AddSteps ></AddSteps>
            </>
        )
    }

    function renderButtons() {
        return (
            <div className="bottom-part">
                <hr />
                <ConfirmCancelButtons
                    handleConfirm={onSubmit}
                    handleCancel={() => { }}
                    className="justify-content-center"
                />
            </div>
        )
    }
}

export default RecipeAddForm;