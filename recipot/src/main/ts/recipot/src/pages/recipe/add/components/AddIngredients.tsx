import { Card, Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import MySelect from "../../../../components/basicUi/MySelect";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { RecipeIngredient } from "../../../../data/types";
import { onAddElementClick, onDeleteElementClick } from "../ListManipulation";

function AddIngredients() {
    const { t } = useTranslation();
    const testOptions = [{ label: "op1", value: { name: "nam1" } }, { label: "op2", value: { name: "nam2" } }, { label: "op3", value: { name: "nam3" } }];
    const [ingredients, setIngredients] = useState<any[]>([]);
    const basicIngredient: any = {
        id: "",
        ingredient: "",
        amount: 0,
        unit: "",
        recipe: {}
    }
    const onAddIngredientClick = () => {
        onAddElementClick(setIngredients, ingredients, basicIngredient);
    }
    const onDeleteIngredientClick = (index: number) => {
        onDeleteElementClick(setIngredients, ingredients, index);
    }
    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.ingredients')}</h4>
            <div className="text-start">
                {ingredients.map((ingredient, index) => { return renderSingleRow(ingredient, index) })}
            </div>
            <MyButton.Primary onClick={onAddIngredientClick}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );
    function renderSingleRow(ingredient: any, index: number) {
        return (
            <Card className="my-4" key={index}>
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section ">
                        <Col>
                            {renderAmountInput()}
                        </Col>
                        <Col>
                            {renderUnitInput()}
                        </Col>
                        <Col md={6}>
                            {renderIngredientInput()}
                        </Col>
                        <Col className="bin-icon"><MdOutlineDeleteOutline onClick={() => onDeleteIngredientClick(index)} /></Col>
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
            <MySelect
                required={true}
                isValid={true}
                name="unit"
                label="Jednostka"
                emptyOption="Pusta wartość"
                options={testOptions}
                defaultValue={testOptions[1].value} onChange={(value: string) => console.log(value)} />
        )
    }
    function renderIngredientInput() {
        return (
            <MySelect
                required={true}
                isValid={true}
                name="unit" 
                label="Składnik" 
                emptyOption="Pusta wartość" 
                options={testOptions} 
                defaultValue={testOptions[1].value} 
                onChange={(value: string) => console.log(value)} />
        )
    }
}

export default AddIngredients;