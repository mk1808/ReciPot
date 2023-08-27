import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";

function BasicInfo({ recipe }: { recipe: Recipe }) {
    return (
        <div className="mt-3 mb-5 px-5 basic-info">
            <div className="my-4">
                {recipe.description}
            </div>
            <Row>
                <Col className="border-right">
                    <div className="test"></div>
                </Col>
                <Col className="border-left">
                    <div className="test"></div>
                </Col>
            </Row>
        </div>
    )
}

export default BasicInfo;