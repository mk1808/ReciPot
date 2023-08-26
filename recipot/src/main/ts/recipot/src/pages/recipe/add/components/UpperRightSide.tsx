import TimeAmountInput from "../../../../components/complex/TimeAmountInput";
import { renderBasicInput } from "../RecipeAdd";

function UpperRightSide() {
    return (
        <div className="text-start">
            {renderTimeAmountInput()}
        </div>
    );
    function renderTimeAmountInput() {
        return (
            <TimeAmountInput
                name="timeAmountFrom"
                label={"Ilość czasu na przygotowanie"}
                onChange={() => { }}
            />
        )
    }
}

export default UpperRightSide;