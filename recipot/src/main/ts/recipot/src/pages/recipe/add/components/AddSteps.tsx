import { BsPlusCircleFill } from "react-icons/bs";
import MyButton from "../../../../components/basicUi/MyButton";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Col, Row } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RecipeStep } from "../../../../data/types";
import { useState } from "react";
import { onAddElementClick, onDeleteElementClick } from "../ListManipulation";
import { useContext, useEffect } from "react";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { checkInputValidity, dynamicInputAttributesForContext } from "../../../../utils/FormInputUtils";

function AddSteps() {
    const { t } = useTranslation();
    const FIELD_NAME = 'steps';
    const basicStep: any = {
        id: "",
        order: 0,
        description: "",
        recipe: undefined
    }
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;
    function onChange(fieldValue: any, fieldName: string, index?: number) {

        if (formFields.formValue && formFields.formValue[fieldName] !== fieldValue) {
            addRecipeDispatchContext({
                type: "onChange",
                fieldName: FIELD_NAME,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue),
                subFieldName: fieldName,
                isIngredientOrStep: true,
                index: index
            })
        }
    }

    function onAdd() {
        console.log("onAdd")
        basicStep.id = Math.random() * 1000;
        addRecipeDispatchContext({
            type: "onAdd",
            basicObj: basicStep,
            fieldName: FIELD_NAME
        })
    }

    function onDelete(index: number) {
        console.log("onDelete")
        addRecipeDispatchContext({
            type: "onDelete",
            fieldName: FIELD_NAME,
            index
        })
    }

    function getStepValidity(fieldName: string, index: number) {
        return formFields?.formValidity && formFields?.formValidity.steps[index] ? formFields?.formValidity.steps[index][fieldName] : false;
    }

    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.recipeSteps')}</h4>
            <div className="text-start">
                {formFields?.formValue?.steps?.map((step: any, index: number) => { return renderSingleRow(step, index) })}
            </div>
            <MyButton.Primary onClick={onAdd}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );

    function renderSingleRow(step: any, index: number) {
        return (
            <Row className="steps-section align-items-center" key={step.id}>
                <Col md={1} className="step-number">
                    {index + 1}
                </Col>
                <Col >
                    {renderStepInput(step, index)}
                </Col>
                <Col md={1} className="bin-icon"><MdOutlineDeleteOutline onClick={() => onDelete(index)} /></Col>
            </Row>
        );
    }

    function renderStepInput(step: any, index: number) {
        return (
            <MyTextarea
                required={true}
                label={t('p.step')}
                placeholder={t('p.step')}
                rows={4}
                {...dynamicInputAttributesForContext("description", onChange, getStepValidity, index)}
            />
        )
    }
}

export default AddSteps;