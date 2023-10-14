import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";

import ListContainer from "./ListContainer";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { BasicStep } from "../../../../data/utilTypes";
import { getDefaultValue } from "../../../../utils/AddRecipeContextUtil";
import { InputAttrsType, checkInputValidity, inputAttrs } from "../../../../utils/FormInputUtils";
import { getRand } from "../../../../utils/MathUtils";
import { AddRecipeContext, AddRecipeContextType, AddRecipeDispatchContext } from "../context/AddRecipeContext";

function AddSteps() {
    const FIELD_NAME = 'recipeSteps';
    const { t } = useTranslation();
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;

    const basicStep: BasicStep = {
        id: "",
        order: 0,
        description: "",
        recipe: {}
    }
    const fieldsAndMainName = { formFields, mainFieldName: FIELD_NAME };

    function onChange(fieldValue: any, fieldName: string, index?: number) {
        const isValueChanged = formFields.formValue && formFields.formValue[fieldName] !== fieldValue;
        if (isValueChanged) {
            addRecipeDispatchContext({
                type: AddRecipeContextType.OnChange,
                fieldName: FIELD_NAME,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue),
                subFieldName: fieldName,
                isIngredientOrStep: true,
                index
            })
        }
    }

    function onAdd() {
        addRecipeDispatchContext({
            type: AddRecipeContextType.OnAdd,
            basicObj: { ...basicStep, id: getRand() },
            fieldName: FIELD_NAME
        })
    }

    function onDelete(index: number) {
        addRecipeDispatchContext({
            type: AddRecipeContextType.OnDelete,
            fieldName: FIELD_NAME,
            index
        })
    }

    function getStepValidity(fieldName: string, index: number) {
        const recipeSteps = formFields?.formValidity?.recipeSteps;
        return recipeSteps && recipeSteps[index] ? recipeSteps[index][fieldName] : false;
    }

    function getAttributes(name: string, index: number, defaultValue: any) {
        return inputAttrs({
            name,
            onChange,
            getValidity: getStepValidity,
            index,
            defaultValue,
            type: InputAttrsType.DynamicContext,
        });
    }

    return (
        <ListContainer title={t('p.recipeSteps')} onAdd={onAdd}>
            {formFields?.formValue?.recipeSteps?.map(renderSingleRow)}
        </ListContainer>
    );

    function renderSingleRow(step: any, index: number) {
        return (
            <Row className="steps-section align-items-center" key={step.id}>
                <Col md={1} className="step-number">
                    {index + 1}
                </Col>
                <Col>
                    {renderStepInput(index)}
                </Col>
                <Col md={1} className="bin-icon">
                    <FaTrashCan onClick={() => onDelete(index)} />
                </Col>
            </Row>
        );
    }

    function renderStepInput(index: number) {
        return (
            <MyTextarea
                required
                label={t('p.step')}
                placeholder={t('p.step')}
                rows={4}
                {...getAttributes("description", index, getDefaultValue("description", index, fieldsAndMainName))}
            />
        )
    }
}

export default AddSteps;