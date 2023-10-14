import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";

import ListContainer from "./ListContainer";
import MyInput from "../../../../components/basicUi/MyInput";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { BasicIngredient } from "../../../../data/utilTypes";
import { getDefaultValue } from "../../../../utils/AddRecipeContextUtil";
import { onFilteredIngredientSearch } from "../../../../utils/DictionariesUtils";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import { getRand } from "../../../../utils/MathUtils";
import { AddRecipeContext, AddRecipeContextType, AddRecipeDispatchContext } from "../context/AddRecipeContext";

function AddIngredients() {
    const FIELD_NAME = 'recipeIngredients';
    const { t } = useTranslation();
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;

    const basicIngredient: BasicIngredient = {
        id: "",
        ingredient: null,
        amount: 0,
        unit: "",
        recipe: {}
    };
    const fieldsAndMainName = { formFields, mainFieldName: FIELD_NAME };

    useEffect(() => {
        onFilteredIngredientSearch('', setFilteredIngredients);
    }, [])

    function onChange(fieldValue: any, fieldName: string, index?: number) {
        const isValueChanged = getDefaultValue(fieldValue, index || 0, fieldsAndMainName) !== fieldValue;
        if (isValueChanged) {
            addRecipeDispatchContext({
                type: AddRecipeContextType.OnChange,
                fieldName: FIELD_NAME,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue, fieldName),
                subFieldName: fieldName,
                isIngredientOrStep: true,
                index
            })
        }
    }

    function onAdd() {
        addRecipeDispatchContext({
            type: AddRecipeContextType.OnAdd,
            basicObj: { ...basicIngredient, id: getRand() },
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
        const recipeIngr = formFields?.formValidity?.recipeIngredients;
        return recipeIngr && recipeIngr[index] ? recipeIngr[index][fieldName] : false;
    }

    function getAttributes(name: string, index: number, defaultValue: any) {
        return inputAttrs({
            name,
            onChange,
            getValidity: getIngredientValidity,
            index,
            defaultValue,
            type: InputAttrsType.DynamicContext,
        })
    }

    return (
        <ListContainer title={t('p.ingredients')} onAdd={onAdd}>
            {formFields?.formValue?.recipeIngredients?.map(renderSingleRow)}
        </ListContainer>
    );

    function renderSingleRow(ingredient: any, index: number) {
        return (
            <Card className="my-4" key={ingredient.id}>
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section">
                        {renderInputs(index)}
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    function renderInputs(index: number) {
        return (
            <>
                <Col xl={3} xs={6}>
                    {renderAmountInput(index)}
                </Col>
                <Col xl={3} xs={6}>
                    {renderUnitInput(index)}
                </Col>
                <Col>
                    {renderIngredientInput(index)}
                </Col>
                <Col className="bin-icon" lg={1}>
                    <FaTrashCan onClick={() => onDelete(index)} />
                </Col>
            </>
        )
    }

    function renderAmountInput(index: number) {
        return (
            <MyInput
                label={t('p.amount')}
                type="number"
                className="simple-input"
                step={0.1}
                {...getAttributes("amount", index, getDefaultValue("amount", index, fieldsAndMainName))}
            />
        )
    }

    function renderUnitInput(index: number) {
        return (
            <MyInput
                label={t('p.unit')}
                required
                className="simple-input"
                {...getAttributes("unit", index, getDefaultValue("unit", index, fieldsAndMainName))}
            />
        )
    }

    function renderIngredientInput(index: number) {
        return (
            <FilteredSelect
                className="mb-3"
                label={t("p.ingredient")}
                options={filteredIngredients}
                onSearchCallback={(phrase: string) => onFilteredIngredientSearch(phrase, setFilteredIngredients)}
                highlightValidity
                allowNew
                onSelectCallback={(value: string) => onChange(value, "ingredient", index)}
                isValid={getIngredientValidity("ingredient", index)}
                defaultValue={getDefaultValue("ingredient", index, fieldsAndMainName)}
            />
        )
    }
}

export default AddIngredients;