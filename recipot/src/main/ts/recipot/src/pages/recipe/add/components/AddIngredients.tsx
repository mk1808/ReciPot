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
import { inputAttributesForContext } from "../../../../utils/FormInputUtils";

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
        //
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
        addRecipeDispatchContext({
            type: "onAdd",
            isIngredient: true,
            basicObj: basicIngredient,
            fieldName: "ingredients"
        })
    }

    function checkInputValidity(fieldValue: any, fieldName: string) {
        switch (fieldName) {
            case 'name': {
                return fieldValue && fieldValue.length > 3;
            }
            case 'amount': {
                return fieldValue && Number(fieldValue) > 0;
            }
            default: {
                return true;
            }
        }
    }

    function getValidity(fieldName: string) {
        return formFields?.formValidity ? formFields?.formValidity[fieldName] : false;
    }

    function getIngredientValidity(fieldName: string, index: number) {
        return formFields?.formValidity ? formFields?.formValidity.ingredients[index][fieldName] : false;
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

                {formFields.formValue && formFields.formValue.ingredients && formFields.formValue.ingredients.map((ingredient: any, index: number) => { return renderSingleRow(ingredient, index) })}
            </div>
            <MyButton.Primary onClick={onAdd}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );
    function renderSingleRow(ingredient: any, index: number) {
        return (
            <Card className="my-4" key={index}>
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section ">
                        <Col>
                            {renderAmountInput(index)}
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
    function renderAmountInput(index: number) {
        return (
            <MyInput
                label="Ilość"
                required={true}
                defaultValue="0"
                type="number"
                name={"amount"}
                isValid={getIngredientValidity("amount", index)}
                onChange={(value: string) => onChange(value, "amount", index)}

            />
        )
    }
    function renderUnitInput() {
        return (
            <MySelect
                required={true}
                label="Jednostka"
                emptyOption="Pusta wartość"
                options={testOptions}
                defaultValue={testOptions[1].value}
                {...inputAttributesForContext("unit", onChange, getValidity)} />
        )
    }
    function renderIngredientInput() {
        return (
            <MySelect
                required={true}
                label="Składnik"
                emptyOption="Pusta wartość"
                options={testOptions}
                defaultValue={testOptions[1].value}
                {...inputAttributesForContext("content", onChange, getValidity)}
            />
        )
    }
}

export default AddIngredients;