import { Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { renderBasicInput } from "../RecipeAdd";
import { useTranslation } from "react-i18next";

function AddIngredients() {
    const { t } = useTranslation();
    return (
        <div className="mt-5">
        <hr />
        <h4 className="mt-3">{t('p.ingredients')}</h4>
        <div className="text-start">
            {renderSingleRow()}
            {renderSingleRow()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
        </div>

        <MyButton.Primary onClick={() => { }}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>

    </div>
    );
    function renderSingleRow(){
        return (
            <Row className="ingredient-section my-2">
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
        )
    }
}

export default AddIngredients;