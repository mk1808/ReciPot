import { renderBasicInput } from "../RecipeAdd";

function UpperRightSide() {
    return (
        <div className="text-start">
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
        </div>
    );
}

export default UpperRightSide;