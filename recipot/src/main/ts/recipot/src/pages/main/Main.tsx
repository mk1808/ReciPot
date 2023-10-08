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
import { goToFilters, openInBackground } from "../../utils/NavigationUtils";
import { createUrl, updatePageUrl } from "../../utils/RecipeSearchUtils";
import { ApiRequestSendManager } from "../../utils/ApiRequestSendManager";

const getRandomRequestManager = ApiRequestSendManager();
function Main() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const recipeCallback = (recipe: Recipe) => { navigate(`/recipes/${recipe.id}`) }
    const recipeCallbackForSlider = (recipe: Recipe, event: any,) => openInBackground(`/recipes/${recipe.id}`, event, navigate);
    const moreNewRecipesCallback = () => {
        goToFilters({ recipesSort: { fieldName: 'created', order: 'DESC' } }, navigate);
    }
    const [isRandomLoaded, setIsRandomLoaded] = useState(false);
    const [randomRecipe, setRandomRecipe] = useState(initAs<Recipe>());
    const [recipes, setRecipes] = useState([]);
    const [statistics, setStatistics] = useState<GeneralStatisticsDto>();
    const onGetRandomSuccess = (response: any) => { setRandomRecipe(response.value && response.value[0]); getRandomRequestManager.unlock() }

    useEffect(() => {
        getRandomRequestManager.nextAndLock(() => {
            recipesApi.getRandom({ number: 1 }, onGetRandomSuccess)
        })
        recipesApi.getPredefinedFilter({ pageNum: 0, pageSize: 20, type: "NEWEST" }, (response: any) => {
            setRecipes(response.value.content)
        })
        statisticsApi.getGeneralStatistics((response) => { setStatistics(response.value) })

    }, [])



    return (
        <div className=" main-page">
            <Col className="main-column">
                <Row className="recipe-circle-container">
                    {randomRecipe && renderRecipeCardCircle()}
                </Row>
                <Row className="recipes-list">
                    {renderRecipesList()}
                </Row>
                <Row className="statistics">
                    {renderStatistics()}
                </Row>
                <Row className="categories">
                    <MainPageCategories/>
                </Row>
            </Col>
        </div>
    );

    function renderRecipeCardCircle() {
        return <RecipeCardCircle recipe={randomRecipe} recipeCallback={() => recipeCallback(randomRecipe)}/>
    }

    function renderRecipesList() {
        return (
            <div>
                <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                    <MyHeader title={t('p.newestRecipes')} level="2" dispLevel="3" />
                    <MyButton.Primary onClick={moreNewRecipesCallback}>{t('p.more')} <FaMagnifyingGlass className="ms-3" /> </MyButton.Primary>
                </Stack>
                <SlidingCards recipes={recipes} goToRecipeCallback={recipeCallbackForSlider}/>
                <div/>
            </div>
        )
    }

    function renderStatistics() {
        return (
            <div className='d-flex flex-md-row flex-column flex-wrap g-5 justify-content-center py-3 main-container my-4 mx-auto'>
                <StatisticCircle value={statistics?.recipesCount ?? 0} size={150} ringSize={30} label={t('p.recipesCount')} />
                <StatisticCircle value={statistics?.usersCount ?? 0} size={150} ringSize={30} label={t('p.usersCount')} />
                <StatisticCircle value={statistics?.allRecipeCollectionsCount ?? 0} size={150} ringSize={30} label={t('p.allRecipeCollectionsCount')} />
            </div>
        )
    }
}

export default Main;