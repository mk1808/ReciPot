import { Stack } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import { Recipe } from "../../../../data/types";
import { roundToHalf } from "../../../../utils/MathUtils";
import { t } from "i18next";

function Rating({ recipe, className }: { recipe: Recipe, className?: string }) {
    return (
        <Stack direction="horizontal" className={`px-5 rating ${className}`} gap={3}>
            <div className="pe-0 star-col">
                <StarSelectInput
                    required
                    disabled={true}
                    defaultValue={roundToHalf(recipe.averageRating)}
                    name=""
                    isValid={true}
                    onChange={(value: any) => { }}
                />
            </div>

            <div className="ps-0">
                <span>{recipe.averageRating} / 5 ({recipe.ratingsCount} {t('p.ratingsCount')})</span>
            </div>
        </Stack>
    )
}

export default Rating;