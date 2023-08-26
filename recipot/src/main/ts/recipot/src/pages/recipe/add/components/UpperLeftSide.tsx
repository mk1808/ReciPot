import { useTranslation } from "react-i18next";
import MyInput from "../../../../components/basicUi/MyInput";
import { renderBasicInput } from "../RecipeAdd";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import TimeAmountInput from "../../../../components/complex/TimeAmountInput";

function UpperLeftSide() {
    const { t } = useTranslation();
    return (
        <div className="text-start">
            {renderNameInput()}
            {renderDescriptionInput()}
            {renderImageInput()}
        </div>
    );
    function renderNameInput() {
        return (
            <MyInput
                name="name"
                label="Nazwa"
                onChange={(value: string) => { console.log(value); }}
                required={true}
                isValid={true}
            />
        )
    }

    function renderDescriptionInput() {
        return (
            <MyTextarea
                required={true}
                isValid={true}
                name="name"
                label="Opis"
                placeholder="Input test 1"
                rows={5}
                onChange={(value: string) => console.log(value)} />
        )
    }

    function renderImageInput() {
        return (
            <MyInput
                name="name"
                label="Zdjęcie"
                onChange={(value: string) => { console.log(value); }}
                required={true}
                isValid={true}
            />
        )
    }
}



export default UpperLeftSide;