import { Col, Container, Row, Stack } from "react-bootstrap";
import './styles.scss';
import MyHeader from "../../components/basicUi/MyHeader";
import { useTranslation } from "react-i18next";
import StatisticCircle from "../../components/complex/StatisticCircle";

function Main() {
    const { t } = useTranslation();
    return (
        <div className=" main-page">
            <Col className="main-column">
                <Row className="recipe-circle-container">
                    {renderRecipeCardCircle()}
                </Row>
                <Row className="recipes-list">
                    <div>
                        <h2 className="my-3 display-3">{t('p.newestRecipes')}</h2>
                    </div>
                </Row>
                <Row className="statistics">
                    <div className="my-4">
                    <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center py-3'>
                <div className='col-3'><StatisticCircle value="12" size={150} ringSize={30} label={t('p.recipesCount')} /></div>
                <div className='col-3'><StatisticCircle value="10" size={150} ringSize={30} label={t('p.usersCount')} /></div>
                <div className='col-3'><StatisticCircle value="53" size={150} ringSize={30} label={t('p.allRecipeCollectionsCount')} /></div>
          </Stack>

                    </div>
                </Row>
                <Row className="recipes-list">
                    <div>
                        <h2 className="my-3 display-3">{t('p.categories')}</h2>
                    </div>
                </Row>
            </Col>
        </div>
    );

    function renderRecipeCardCircle() {
        return (
            <></>
        )
    }


}

export default Main;