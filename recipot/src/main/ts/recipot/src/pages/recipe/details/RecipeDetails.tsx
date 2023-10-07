import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import './styles.scss';
import MyImage from "../../../components/basicUi/MyImage";
import MyHeader from "../../../components/basicUi/MyHeader";
import OtherColumn from "./components/OtherColumn";
import BasicInfo from "./components/BasicInfo";
import IngredientList from "./components/IngredientsList";
import Steps from "./components/Steps";
import PrivateNote from "./components/PrivateNote";
import Comments from "./components/Comments";
import { OpinionDto, PrivateNote as PrivateNoteT, Recipe, RecipeSearchDto } from "../../../data/types";
import { initAs } from "../../../utils/ObjectUtils";
import { useEffect, useState } from "react";
import BreadCrumbs from "./components/BreadCrumbs";
import ActionButtons from "./components/ActionButtons";
import recipesApi from "../../../api/RecipesApi";
import { useParams } from "react-router-dom";
import opinionsApi from "../../../api/OpinionsApi";
import privateNotesApi from "../../../api/PrivateNotes";
import Rating from "./components/Rating";
import { buildRecipeSearchDto } from "../../../utils/RecipeSearchUtils";
import { UsersContext } from "../../../context/UserContext";
import recipeCollectionsApi from "../../../api/RecipeCollectionsApi";
import MySpinner from "../../../components/basicUi/MySpinner";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Stack } from "react-bootstrap";
import { formatNoTime } from "../../../utils/DateUtils";

function RecipeDetails() {
    const { t } = useTranslation();
    const params = useParams();
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const [otherRecipes, setOtherRecipes] = useState<Recipe[]>([]);
    const [opinions, setOpinions] = useState<any | OpinionDto[]>([]);
    const [note, setNote] = useState<any | PrivateNoteT>(initAs());
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNoteLoaded, setIsNoteLoaded] = useState<boolean>(false);
    const [favRecipeCollection, setFavRecipeCollection] = useState<any>();
    const id: string = params.id ?? "";
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const user = useContext(UsersContext).user;
    const mainRef = useRef<any>(null);
    useEffect(() => {
        setIsLoaded(false);
        setOtherRecipes(otherRecipes.slice(0, 1));
        recipesApi.getRecipe(id, onGetRecipeSuccess)
        getOpinions(id);
        recipesApi.getRecipeOwner(id, onGetRecipeOwnerSuccess);
        recipeCollectionsApi.getUserCollectionByName('Favourite', onGetUserCollectionByNameSuccess)
        setOpinions([]);
        setNote({});
    }, [params])
    useEffect(() => {
        if (user) {
            recipesApi.getRecipeOwner(id, onGetRecipeOwnerSuccess);
            privateNotesApi.getPrivateNoteByRecipeId(id, (response) => { setNote(response.value); setIsNoteLoaded(true) }, (errorResponse) => { console.warn(errorResponse) });
        }
    }, [user])
    function getOpinions(id: string) {
        opinionsApi.getRecipeOpinions(id, (response) => { setOpinions(response.value) })
    }
    function onGetRecipeSuccess(response: any) {
        setRecipe(response.value);
        setIsLoaded(true);
        const filter: RecipeSearchDto = buildRecipeSearchDto({ categories: response.value.categories, recipesSort: { fieldName: "created", order: "DESC" } });
        recipesApi.search(filter, { pageNum: 0, pageSize: 10 }, (response) => { setOtherRecipes(response.value.content) });
    }
    function onGetRecipeOwnerSuccess(response: any) {
        let owner = response.value;
        setIsOwner(!!user && owner.id === user?.id);
    }
    function onGetUserCollectionByNameSuccess(response: any) {
        setFavRecipeCollection(response.value);
    }

    return (
        <div className='m-2 recipe-details-page'>
            {renderColumns()}
        </div>
    );
    function renderColumns() {
        return (
            <div className='d-flex flex-lg-row flex-column align-items-stretch details-container justify-content-center gy-2'>
                <div className='basic-container-border p-3 main-container' ref={mainRef} >
                    {!isLoaded && <MySpinner />}
                    {isLoaded && renderMainRecipeColumn()}
                </div>
                <div className='basic-container-border p-3 ms-md-2'>
                    <OtherColumn recipes={otherRecipes} />
                </div>
            </div>
        )
    }

    function renderMainRecipeColumn() {
        return (
            <div className="mt-3 main">
                <MyImage src={recipe.image} height="auto" className="main-img" rounded></MyImage>
                <ActionButtons recipe={recipe} isOwner={isOwner} user={user} favCollection={favRecipeCollection} />
                <MyHeader title={recipe.name}></MyHeader>
                {renderAuthorAndCreationDate()}
                <div>{renderBreadcrumps()}</div>
                <BasicInfo recipe={recipe} />
                <IngredientList recipe={recipe} />
                <Steps recipe={recipe} />
                {isNoteLoaded && <PrivateNote recipe={recipe} note={note} />}
                <Comments recipe={recipe} opinions={opinions} getOpinions={getOpinions} />
            </div>
        )
    }

    function renderBreadcrumps() {
        return (
            <div className="px-5">
                <BreadCrumbs recipe={recipe}></BreadCrumbs>
            </div>

        )
    }

    function renderAuthorAndCreationDate() {
        return (
            <Stack direction="horizontal" className="flex-wrap my-3 px-5 author-date">
                <div className="me-5 owner-login"><strong><FaUser /></strong> {recipe.owner.login}</div>
                <div className="recipe-creation-time"><strong><FaRegCalendarDays /></strong> {formatNoTime(recipe.created)}</div>
                <div className="rating-section ms-auto"><Rating recipe={recipe} className="position" /></div>
            </Stack>
        );
    }

}

export default RecipeDetails;