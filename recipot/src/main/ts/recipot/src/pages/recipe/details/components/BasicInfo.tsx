import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function BasicInfo() {
    return (
        <div className="mt-3 mb-5 px-5 basic-info">
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