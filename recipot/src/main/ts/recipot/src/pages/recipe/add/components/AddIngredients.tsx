import { Card, Col, Row } from "react-bootstrap";
import MyButton from "../../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import MySelect from "../../../../components/basicUi/MySelect";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AddRecipeContext, AddRecipeDispatchContext } from "../../../../context/AddRecipeContext";
import { dynamicInputAttributesForContext } from "../../../../utils/FormInputUtils";
import FilteredSelect from "../../../../components/complex/FilteredSelect";
import { onFilteredIngredientSearch } from "../../../../utils/DictionariesUtils";

function AddIngredients() {
    const { t } = useTranslation();
    const FIELD_NAME = 'recipeIngredients';
    const testOptions = [{ label: "op1", value: { name: "nam1" } }, { label: "op2", value: { name: "nam2" } }, { label: "op3", value: { name: "nam3" } }];
    const basicIngredient: any = {
        id: "",
        ingredient: "",
        amount: 0,
        unit: "",
        recipe: {}
    }
    const addRecipeDispatchContext = useContext(AddRecipeDispatchContext);
    const formFields = useContext(AddRecipeContext).fields;
    const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
    useEffect(() => {
        onFilteredIngredientSearch('', setFilteredIngredients);
    }, [])
    function onChange(fieldValue: any, fieldName: string, index?: number) {

        if (formFields.formValue && formFields.formValue[fieldName] !== fieldValue) {
            addRecipeDispatchContext({
                type: "onChange",
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
            type: "onAdd",
            basicObj: basicIngredient,
            fieldName: FIELD_NAME
        })
    }

    function onDelete(index: number) {
        addRecipeDispatchContext({
            type: "onDelete",
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
        return formFields?.formValidity && formFields?.formValidity.recipeIngredients[index] ? formFields?.formValidity.recipeIngredients[index][fieldName] : false;
    }

    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.ingredients')}</h4>
            <div className="text-start">
                {formFields?.formValue?.recipeIngredients?.map((ingredient: any, index: number) => { return renderSingleRow(ingredient, index) })}
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
                label={t('p.amount')}
                required={true}
                defaultValue="0"
                type="number"
                {...dynamicInputAttributesForContext("amount", onChange, getIngredientValidity, index)}
            />
        )
    }
    function renderUnitInput(index: number) {
        return (
            <MyInput
                label={t('p.unit')}
                required={true}
                {...dynamicInputAttributesForContext("unit", onChange, getIngredientValidity, index)}
            />
        )
    }
    function renderIngredientInput(index: number) {
        return (
            <FilteredSelect
                multiple={false}
                className="mb-3"
                label={t("p.ingredient")}
                options={filteredIngredients}
                onSearchCallback={(phrase: string) => onFilteredIngredientSearch(phrase, setFilteredIngredients)}
                highlightValidity={true}
                allowNew={true}
                onSelectCallback={(value: string) => onChange(value, "ingredient", index)}
                isValid={getIngredientValidity("ingredient", index)}
            />
        )
    }
}
export default AddIngredients;