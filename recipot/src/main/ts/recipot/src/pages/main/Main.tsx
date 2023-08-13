import { Col, Container, Row } from "react-bootstrap";
import './styles.scss';
import MyHeader from "../../components/basicUi/MyHeader";
import { useTranslation } from "react-i18next";

function Main() {
    const { t } = useTranslation();
    return (
        <div className=" main-page">
            <Col className="main-column">
                <Row className="recipe-circle-container"></Row>
                <Row className="recipes-list">
                    <div>
                        <h2 className="my-3 display-3">{t('p.newestRecipes')}</h2>
                    </div>
                    </Row>
                <Row className="statistics"><div>statistics</div></Row>
                <Row className="recipes-list">
                    <div>
                        <h2 className="my-3 display-3">{t('p.categories')}</h2>
                    </div>
                    </Row>
            </Col>
        </div>
    );


}

export default Main;