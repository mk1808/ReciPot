import { BsPlusCircleFill } from "react-icons/bs";
import MyButton from "../../../../components/basicUi/MyButton";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Col, Row } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RecipeStep } from "../../../../data/types";
import { useState } from "react";

function AddSteps() {
    const { t } = useTranslation();
    const onDeleteIngredientClick = (index?: number) => { };
    const [steps, setSteps] = useState<any[]>([]);
    const basicStep: any = {
        id: "",
        order: 0,
        description: "",
        recipe: undefined
    }
    const onAddStepClick = () => {
        let list = [...steps];
        list.push(basicStep);
        setSteps(list);
    }
    const onDeleteStepClick = (index?: number) => {
        let list = [...steps];
        list.splice(index||0, 1);
        setSteps(list);
    }
    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{t('p.recipeSteps')}</h4>
            <div className="text-start">
                {renderSteps()}

                <Row className="steps-section align-items-center   ">
                    <Col md={1} className="step-number">
                        {1}
                    </Col>
                    <Col >
                        {renderSteps()}
                    </Col>
                    <Col md={1} className="bin-icon"><MdOutlineDeleteOutline onClick={() => onDeleteStepClick()} /></Col>
                </Row>
            </div>

            <MyButton.Primary onClick={onAddStepClick}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );

    function renderSteps() {
        return (
            <MyTextarea required={true} isValid={true} name="test4" label="Krok" placeholder="Input test 1" rows={4}
                onChange={(value: string) => console.log(value)} />
        )

    }
}

export default AddSteps;