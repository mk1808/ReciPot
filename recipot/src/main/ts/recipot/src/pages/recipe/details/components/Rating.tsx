import { Col, Row } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import { Recipe } from "../../../../data/types";
import { roundToHalf } from "../../../../utils/MathUtils";
import { t } from "i18next";

function Rating({ recipe }: { recipe: Recipe }) {
    return (
        <Row className="px-5 rating" gap={1}>
            <Col></Col>
            <Col md={4} className="pe-0 star-col">
                <StarSelectInput
                    required
                    disabled={true}
                    defaultValue={roundToHalf(recipe.averageRating)}
                    name=""
                    isValid={true}
                    onChange={(value: any) => { }}
                />
            </Col>

            <Col md={5} className="ps-0">
                <span>{recipe.averageRating} / 5 ({recipe.ratingsCount} {t('p.ratingsCount')})</span>
            </Col>
        </Row>
    )
}

export default Rating;