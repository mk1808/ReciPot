import { Col, Container, Row, Stack } from "react-bootstrap";
import './styles.scss';
import MyHeader from "../../components/basicUi/MyHeader";
import { useTranslation } from "react-i18next";
import StatisticCircle from "../../components/complex/StatisticCircle";
import MyButton from "../../components/basicUi/MyButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MainPageCategories from "./components/MainPageCategories";

function Main() {
    const { t } = useTranslation();
    return (
        <div className=" main-page">
            <Col className="main-column">
                <Row className="recipe-circle-container">
                    {renderRecipeCardCircle()}
                </Row>
                <Row className="recipes-list">
                    {renderRecipesList()}
                </Row>
                <Row className="statistics">
                    {renderStatistics()}
                </Row>
                <Row className="categories">
                    <MainPageCategories></MainPageCategories>
                    
                </Row>
            </Col>
        </div>
    );

    function renderRecipeCardCircle() {
        return (
            <></>
        )
    }

    function renderRecipesList() {
        return (
            <div>
                <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                    <h2 className="my-3 display-3">{t('p.newestRecipes')}</h2>
                    <MyButton.Primary className="mt-3" onClick={() => { }}>{t('p.more')} <FaMagnifyingGlass className="ms-3" /> </MyButton.Primary>
                </Stack>
                <div></div>
            </div>
        )
    }

    function renderStatistics() {
        return (
            <div className="my-4">
                <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center py-3'>
                    <div className='col-3'><StatisticCircle value="12" size={150} ringSize={30} label={t('p.recipesCount')} /></div>
                    <div className='col-3'><StatisticCircle value="10" size={150} ringSize={30} label={t('p.usersCount')} /></div>
                    <div className='col-3'><StatisticCircle value="53" size={150} ringSize={30} label={t('p.allRecipeCollectionsCount')} /></div>
                </Stack>

            </div>
        )
    }


}

export default Main;