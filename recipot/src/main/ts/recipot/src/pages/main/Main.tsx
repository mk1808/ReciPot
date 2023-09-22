import { Col, Container, Row, Stack } from "react-bootstrap";
import './styles.scss';
import MyHeader from "../../components/basicUi/MyHeader";
import { useTranslation } from "react-i18next";
import StatisticCircle from "../../components/complex/StatisticCircle";
import MyButton from "../../components/basicUi/MyButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MainPageCategories from "./components/MainPageCategories";
import RecipeCardCircle from "../../components/complex/RecipeCardCircle";
import { GeneralStatisticsDto, Recipe } from "../../data/types";
import { initAs } from "../../utils/ObjectUtils";
import SlidingCards from "../../components/complex/SlidingCards";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import recipesApi from "../../api/RecipesApi";
import statisticsApi from "../../api/StatisticsApi";
import { openInBackground } from "../../utils/NavigationUtils";

function Main() {
    const { t } = useTranslation();
    const recipe = initAs<Recipe>(
        {
            id: "osidj-oeifj-9239",
            name: "Sałatka warzywna",
            averageRating: 4.5,
            ratingsCount: 110,
            categories: [{ id: "1", name: "Obiady", image: "" }, { id: "2", name: "Zupy", image: "" }],
            hashTags: [{ id: "1", name: "Obiady" }, { id: "2", name: "Zupy" }, { id: "3", name: "Zdrowe" }],
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189cc491e6b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189cc491e6b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        });
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe) => { navigate(`/recipes/${recipe.id}`) }
    const recipeCallbackForSlider = (recipe: Recipe, event: any, ) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const [recipes, setRecipes] = useState([]);
    const [statistics, setStatistics] = useState<GeneralStatisticsDto>();
    useEffect(() => {
        recipesApi.getPredefinedFilter({ pageNum: 0, pageSize: 20, type: "NEWEST" }, (response: any) => {
            setRecipes(response.value.content)
        })
        statisticsApi.getGeneralStatistics((response) => { setStatistics(response.value) })

    }, [])

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
            <RecipeCardCircle recipe={recipe} recipeCallback={recipeCallback}></RecipeCardCircle>
        )
    }

    function renderRecipesList() {
        return (
            <div>
                <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                    <h2 className="my-3 display-3">{t('p.newestRecipes')}</h2>
                    <MyButton.Primary className="mt-4" onClick={() => { }}>{t('p.more')} <FaMagnifyingGlass className="ms-3" /> </MyButton.Primary>
                </Stack>
                <SlidingCards recipes={recipes} goToRecipeCallback={recipeCallbackForSlider}></SlidingCards>
                <div></div>
            </div>
        )
    }

    function renderStatistics() {
        return (
            <div className="my-4">
                <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center py-3'>
                    <div className='col-3'><StatisticCircle value={statistics?.recipesCount ?? 0} size={150} ringSize={30} label={t('p.recipesCount')} /></div>
                    <div className='col-3'><StatisticCircle value={statistics?.usersCount ?? 0} size={150} ringSize={30} label={t('p.usersCount')} /></div>
                    <div className='col-3'><StatisticCircle value={statistics?.allRecipeCollectionsCount ?? 0} size={150} ringSize={30} label={t('p.allRecipeCollectionsCount')} /></div>
                </Stack>

            </div>
        )
    }


}

export default Main;