import { Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { renderBasicInput } from "../RecipeAdd";

function AddIngredients() {
    return (
        <div className="mt-5 ">
        <hr />
        <h4 className="mt-3">Składniki</h4>
        <div className="text-start">
            <Row className="ingredient-section">
                <Col>
                    {renderBasicInput()}
                </Col>
                <Col>
                    {renderBasicInput()}
                </Col>
                <Col md={6}>
                    {renderBasicInput()}
                </Col>
            </Row>
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
        </div>

        <MyButton.Primary onClick={() => { }}>Dodaj <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>

    </div>
    );


}

export default AddIngredients;