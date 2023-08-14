import { BsPlusCircleFill } from "react-icons/bs";
import MyButton from "../../../../components/basicUi/MyButton";
import { useTranslation } from "react-i18next";

function AddSteps() {
    const { t } = useTranslation();
    return (
        <div className="mt-5 ">
            <hr />
            <h4 className="mt-3">{t('p.recipeSteps')}</h4>
            <MyButton.Primary onClick={() => { }}>{t('p.add')} <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );
}

export default AddSteps;