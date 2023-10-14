import { Stack } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import { Recipe } from "../../../../data/types";
import { roundToHalf } from "../../../../utils/MathUtils";
import { t } from "i18next";

type Props = {
    recipe: Recipe,
    className?: string
};

function Rating({
    recipe,
    className
}: Props) {

    return (
        <Stack direction="horizontal" className={`px-5 rating ${className}`} gap={3}>
            <div className="pe-0 star-col">
                {renderStarSelect()}
            </div>
            <div className="ps-0">
                {renderRatingText()}
            </div>
        </Stack>
    )
    
    function renderStarSelect() {
        return (
            <StarSelectInput
                required
                disabled
                defaultValue={roundToHalf(recipe.averageRating)}
                name=""
                isValid
            />
        )
    }

    function renderRatingText() {
        return <span>{`${recipe.averageRating} / 5 (${recipe.ratingsCount} ${t('p.ratingsCount')})`}</span>
    }
}

export default Rating;