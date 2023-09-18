import { Col, Row } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import { Recipe } from "../../../../data/types";

function Rating({ recipe }: { recipe: Recipe }) {
    return (
        <Row className="px-5 rating"><Col></Col>
            <Col md={4}>
                <StarSelectInput
                    required
                    disabled={true}
                    defaultValue={3}
                    name="star"
                    isValid={true}
                    onChange={(value: string) => { }}
                />
            </Col>

            <Col md={4} className="">
                <span>5 / 5 (20 ocen)</span>
            </Col>
        </Row>
    )
}

export default Rating;