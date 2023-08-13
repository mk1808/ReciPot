import { renderBasicInput } from "../RecipeAdd";

function UpperLeftSide() {
    return (
        <div className="text-start">
            {renderBasicInput()}
            {renderBasicInput()}
            {renderBasicInput()}
        </div>
    );
}

export default UpperLeftSide;