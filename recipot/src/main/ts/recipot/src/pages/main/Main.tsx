import { Col, Row, Stack } from "react-bootstrap";
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
import { useEffect, useState } from "react";
import recipesApi from "../../api/RecipesApi";
import statisticsApi from "../../api/StatisticsApi";
import useMyNav from "../../hooks/useMyNav";
import useRequestSendManager from "../../hooks/useRequestSendManager";

function Main() {
    const { t } = useTranslation();
    const [randomRecipe, setRandomRecipe] = useState(initAs<Recipe>());
    const [recipes, setRecipes] = useState([]);
    const [statistics, setStatistics] = useState<GeneralStatisticsDto>();

    const nav = useMyNav();
    const [nextAndLock, unlock] = useRequestSendManager();

    const recipeCallback = (recipe: Recipe) => nav.toRecipe(recipe.id);
    const onGoToRecipe = (recipe: Recipe, event: any) => nav.openInBackground({ id: recipe.id }, event);
    const onMoreNewRecipes = () => {
        nav.goToFilters({ recipesSort: { fieldName: 'created', order: 'DESC' } });
    }
    const onGetRandomSuccess = (response: any) => {
        setRandomRecipe(response.value && response.value[0]); unlock()
    }
    useEffect(() => {
        getRandomRecipe();
        getNewestRecipes();
        getStats();
    }, [])

    function getRandomRecipe() {
        nextAndLock(() => {
            recipesApi.getRandom({ number: 1 }, onGetRandomSuccess)
        })
    }

    function getNewestRecipes() {
        recipesApi.getPredefinedFilter({ pageNum: 0, pageSize: 20, type: "NEWEST" }, (response: any) => {
            setRecipes(response.value.content)
        })
    }

    function getStats() {
        statisticsApi.getGeneralStatistics((response) => { setStatistics(response.value) })
    }

    return (
        <div className="main-page">
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
                    <MainPageCategories />
                </Row>
            </Col>
        </div>
    );

    function renderRecipeCardCircle() {
        return <RecipeCardCircle recipe={randomRecipe} onGoToRecipe={() => recipeCallback(randomRecipe)} />
    }

    function renderRecipesList() {
        return (
            <div>
                <Stack direction="horizontal" gap={3} className='flex-wrap justify-content-center py-3 title'>
                    {renderHeaderWithButton()}
                </Stack>
                <SlidingCards recipes={recipes} onGoToRecipe={onGoToRecipe} />
                <div />
            </div>
        )
    }

    function renderHeaderWithButton() {
        return (<>
            <MyHeader title={t('p.newestRecipes')} level="2" dispLevel="3" />
            <MyButton.Primary onClick={onMoreNewRecipes}>
                {t('p.more')}
                <FaMagnifyingGlass className="ms-3" />
            </MyButton.Primary>
        </>)
    }

    function renderStatistics() {
        return (
            <div className='d-flex flex-md-row flex-column flex-wrap g-5 justify-content-center py-3 main-container my-4 mx-auto'>
                <StatisticCircle
                    value={statistics?.recipesCount ?? 0}
                    size={150}
                    ringSize={30}
                    label={t('p.recipesCount')}
                />
                <StatisticCircle
                    value={statistics?.usersCount ?? 0}
                    size={150}
                    ringSize={30}
                    label={t('p.usersCount')}
                />
                <StatisticCircle
                    value={statistics?.allRecipeCollectionsCount ?? 0}
                    size={150}
                    ringSize={30}
                    label={t('p.allRecipeCollectionsCount')}
                />
            </div>
        )
    }
}

export default Main;