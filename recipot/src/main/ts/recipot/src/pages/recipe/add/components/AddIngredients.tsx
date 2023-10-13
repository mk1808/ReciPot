import { Card, Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import { FaTrashCan } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { AddRecipeContext, AddRecipeContextType, AddRecipeDispatchContext } from "../context/AddRecipeContext";
import { InputAttrsType, inputAttrs } from "../../../../utils/FormInputUtils";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { onFilteredIngredientSearch } from "../../../../utils/DictionariesUtils";
import { getDefaultValue } from "../../../../utils/AddRecipeContextUtil";

function AddIngredients() {
    const FIELD_NAME = 'recipeIngredients';
    const { t } = useTranslation();
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;

    const basicIngredient: any = {
        id: "",
        ingredient: "",
        amount: 0,
        unit: "",
        recipe: {}
    };
    const fieldsAndMainName = { formFields, mainFieldName: FIELD_NAME };

    useEffect(() => {
        onFilteredIngredientSearch('', setFilteredIngredients);
    }, [])

    function onChange(fieldValue: any, fieldName: string, index?: number) {
        if (getDefaultValue(fieldValue, index || 0, fieldsAndMainName) !== fieldValue) {
            addRecipeDispatchContext({
                type: AddRecipeContextType.OnChange,
                fieldName: FIELD_NAME,
                fieldValue,
                fieldValidity: checkInputValidity(fieldValue, fieldName),
                subFieldName: fieldName,
                isIngredientOrStep: true,
                index: index
            })
        }
    }

    function onAdd() {
        basicIngredient.id = Math.random() * 1000;
        addRecipeDispatchContext({
            type: AddRecipeContextType.OnAdd,
            basicObj: basicIngredient,
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
        return formFields?.formValidity?.recipeIngredients && formFields?.formValidity.recipeIngredients[index] ?
            formFields?.formValidity.recipeIngredients[index][fieldName] : false;
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
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.ingredients')}</h4>
            <div className="text-start">
                {formFields?.formValue?.recipeIngredients?.map(renderSingleRow)}
            </div>
            <MyButton.Primary onClick={onAdd} className="button-width">{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );

    function renderSingleRow(ingredient: any, index: number) {
        return (
            <Card className="my-4" key={ingredient.id}>
                <Card.Body className="py-1 px-4">
                    <Row className="ingredient-section ">
                        <Col xl={3} xs={6}>
                            {renderAmountInput(index)}
                        </Col>
                        <Col xl={3} xs={6}>
                            {renderUnitInput(index)}
                        </Col>
                        <Col >
                            {renderIngredientInput(index)}
                        </Col>
                        <Col className="bin-icon" lg={1} ><FaTrashCan onClick={() => onDelete(index)} /></Col>
                    </Row>
                </Card.Body>
            </Card>
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