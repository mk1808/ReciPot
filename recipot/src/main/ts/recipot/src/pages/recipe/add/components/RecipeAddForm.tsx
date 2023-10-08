import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import UpperLeftSide from "./UpperLeftSide";
import AddIngredients from "./AddIngredients";
import UpperRightSide from "./UpperRightSide";
import AddSteps from "./AddSteps";
import ConfirmCancelButtons from "../../../../components/basicUi/ConfirmCancelButtons";
import { AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import useMyNav from "../../../../hooks/useMyNav";

function RecipeAddForm() {
    const nav = useMyNav();
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);

    function onSubmit() {
        addRecipeDispatchContext({
            type: "onSubmit"
        })
    }

    function onCancel() {
        nav.toBack();
    }

    return (
        <>
            {renderForm()}
            {renderButtons()}
        </>
    );

    function renderForm() {
        return (
            <Row className="my-5">
                <Col md={6} xs={12} className="border-right">
                    {renderLeftSide()}
                </Col>
                <Col md={6} xs={12} className="border-left">
                    {renderRightSide()}
                </Col>
            </Row>

        );
    }

    function renderLeftSide() {
        return (
            <>
                <UpperLeftSide />
                <AddIngredients />
            </>
        )
    }

    function renderRightSide() {
        return (
            <>
                <UpperRightSide />
                <AddSteps />
            </>
        )
    }

    function renderButtons() {
        return (
            <div className="bottom-part">
                <hr />
                <ConfirmCancelButtons
                    onConfirm={onSubmit}
                    onCancel={onCancel}
                    className="justify-content-center"
                />
            </div>
        )
    }
}

export default RecipeAddForm;