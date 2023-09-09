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
import { useContext, useEffect } from "react";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { dynamicInputAttributesForContext, inputAttributesForContext } from "../../../../utils/FormInputUtils";

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
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;
    function onChange(fieldValue: any, fieldName: string, index?: number) {

        if (formFields.formValue && formFields.formValue[fieldName] !== fieldValue) {
            addRecipeDispatchContext({
                type: "onChange",
                fieldName: "ingredients",
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue, fieldName),
                subFieldName: fieldName,
                isIngredient: true,
                index: index
            })
        }
    }

    function onAdd(fieldValue: any, fieldName: string) {
        console.log("onAdd")
        basicIngredient.id = Math.random() * 1000;
        addRecipeDispatchContext({
            type: "onAdd",
            isIngredient: true,
            basicObj: basicIngredient,
            fieldName: "ingredients"
        })
    }

    function onDelete(index: number) {
        console.log("onDelete")
        addRecipeDispatchContext({
            type: "onDelete",
            isIngredient: true,
            fieldName: "ingredients",
            index
        })
    }

    function checkInputValidity(fieldValue: any, fieldName: string) {
        switch (fieldName) {
            case 'amount': {
                return fieldValue && Number(fieldValue) > 0;
            }
            default: {
                return true;
            }
        }
    }

    function getIngredientValidity(fieldName: string, index: number) {
        return formFields?.formValidity && formFields?.formValidity.ingredients[index] ? formFields?.formValidity.ingredients[index][fieldName] : false;
    }

    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.ingredients')}</h4>
            <div className="text-start">
                {formFields.formValue && formFields.formValue.ingredients && formFields.formValue.ingredients.map((ingredient: any, index: number) => { return renderSingleRow(ingredient, index) })}
            </div>
            <MyButton.Primary onClick={onAdd}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );
    function renderSingleRow(ingredient: any, index: number) {
        return (
            <Card className="my-4" key={ingredient.id}>
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section ">
                        <Col>
                            {renderAmountInput(index)}
                        </Col>
                        <Col>
                            {renderUnitInput(index)}
                        </Col>
                        <Col md={6}>
                            {renderIngredientInput(index)}
                        </Col>
                        <Col className="bin-icon"><MdOutlineDeleteOutline onClick={() => onDelete(index)} /></Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
    function renderAmountInput(index: number) {
        return (
            <MyInput
                label="Ilość"
                required={true}
                defaultValue="0"
                type="number"
                {...dynamicInputAttributesForContext("amount", onChange, getIngredientValidity, index)}
            />
        )
    }
    function renderUnitInput(index: number) {
        return (
            <MySelect
                required={true}
                label="Jednostka"
                emptyOption="Pusta wartość"
                options={testOptions}
                defaultValue={testOptions[1].value}
                {...dynamicInputAttributesForContext("unit", onChange, getIngredientValidity, index)}
            />
        )
    }
    function renderIngredientInput(index: number) {
        return (
            <MySelect
                required={true}
                label="Składnik"
                emptyOption="Pusta wartość"
                options={testOptions}
                defaultValue={testOptions[1].value}
                {...dynamicInputAttributesForContext("ingredient", onChange, getIngredientValidity, index)}
            />
        )
    }
}

export default AddIngredients;