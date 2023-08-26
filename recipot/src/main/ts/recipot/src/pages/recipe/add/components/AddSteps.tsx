import { BsPlusCircleFill } from "react-icons/bs";
import MyButton from "../../../../components/basicUi/MyButton";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Col, Row } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RecipeStep } from "../../../../data/types";
import { useState } from "react";
import { onAddElementClick, onDeleteElementClick } from "../ListManipulation";

function AddSteps() {
    const { t } = useTranslation();
    const [steps, setSteps] = useState<any[]>([]);
    const basicStep: any = {
        id: "",
        order: 0,
        description: "",
        recipe: undefined
    }
    const onAddStepClick = () => {
        onAddElementClick(setSteps, steps, basicStep);
    }
    const onDeleteStepClick = (index: number) => {
        onDeleteElementClick(setSteps, steps, index);
    }
    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.recipeSteps')}</h4>
            <div className="text-start">
                {steps.map((step, index) => { return renderSingleRow(step, index) })}

            </div>
            <MyButton.Primary onClick={onAddStepClick}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );

    function renderSingleRow(step: any, index: number) {
        return (
            <Row className="steps-section align-items-center   ">
                <Col md={1} className="step-number">
                    {index + 1}
                </Col>
                <Col >
                    {renderStepInput(step)}
                </Col>
                <Col md={1} className="bin-icon"><MdOutlineDeleteOutline onClick={() => onDeleteStepClick(1)} /></Col>
            </Row>
        );
    }



    function renderStepInput(step: any) {
        return (
            <MyTextarea required={true} isValid={true} name="test4" label="Krok" placeholder="Input test 1" rows={4}
                onChange={(value: string) => console.log(value)} />
        )

    }
}

export default AddSteps;