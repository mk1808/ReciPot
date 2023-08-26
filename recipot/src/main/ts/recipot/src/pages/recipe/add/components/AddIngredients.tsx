import { Card, Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { renderBasicInput } from "../RecipeAdd";
import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import MySelect from "../../../../components/basicUi/MySelect";
import { MdOutlineDeleteOutline } from "react-icons/md";

function AddIngredients() {
    const { t } = useTranslation();
    const testOptions = [{ label: "op1", value: { name: "nam1" } }, { label: "op2", value: { name: "nam2" } }, { label: "op3", value: { name: "nam3" } }];

    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.ingredients')}</h4>
            <div className="text-start">
                {renderSingleRow()}
                {renderSingleRow()}
                {renderSingleRow()}

            </div>
            <MyButton.Primary onClick={() => { }}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
            <div className="text-start">
                {renderBasicInput()}
                {renderBasicInput()}
                {renderBasicInput()}
                {renderBasicInput()}
                {renderBasicInput()}
                {renderBasicInput()}
            </div>

           

        </div>
    );
    function renderSingleRow() {
        return (
            <Card className="my-4">
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section ">
                        <Col>
                            {renderAmountInput()}
                        </Col>
                        <Col>
                            {renderUnitInput()}
                        </Col>
                        <Col md={6}>
                            {renderBasicInput()}
                        </Col>
                        <Col className="bin-icon"><MdOutlineDeleteOutline /></Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
    function renderAmountInput() {
        return (
            <MyInput
                name="amount"
                label="Ilość"

                onChange={(value: string) => { console.log(value); }}
                required={true}
                isValid={true}
                defaultValue="0"
                type="number"
            />
        )
    }
    function renderUnitInput() {
        return (
            <MySelect required={true} isValid={true} name="unit" label="Jednostka" emptyOption="Pusta wartość" options={testOptions} defaultValue={testOptions[1].value} onChange={(value: string) => console.log(value)} />
        )
    }
}

export default AddIngredients;