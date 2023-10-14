import { useContext, useRef } from "react";
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
import { buildRecipeSearchDto } from "../filter/utils/RecipeSearchUtils";
import { UsersContext } from "../../../context/UserContext";
import recipeCollectionsApi from "../../../api/RecipeCollectionsApi";
import MySpinner from "../../../components/basicUi/MySpinner";
import AuthorAndDate from "./components/AuthorAndDate";

function RecipeDetails() {

    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const [otherRecipes, setOtherRecipes] = useState<Recipe[]>([]);
    const [opinions, setOpinions] = useState<any | OpinionDto[]>([]);
    const [note, setNote] = useState<any | PrivateNoteT>(initAs());
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNoteLoaded, setIsNoteLoaded] = useState<boolean>(false);
    const [favRecipeCollection, setFavRecipeCollection] = useState<any>();
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const user = useContext(UsersContext);
    const mainRef = useRef<any>(null);
    const params = useParams();
    const id: string = params.id ?? "";

    useEffect(() => {
        setIsLoaded(false);
        setOtherRecipes(otherRecipes.slice(0, 1));
        getRecipe();
        getOpinions(id);
        getRecipeOwner();
        getUserFavCollection();
        setOpinions([]);
        setNote({});
    }, [params])

    useEffect(() => {
        if (user) {
            getRecipeOwner();
            getPrivateNote();
        }
    }, [user])

    function getRecipe() {
        recipesApi.getRecipe(id, onGetRecipeSuccess);
    }

    function getOpinions(id: string) {
        opinionsApi.getRecipeOpinions(id, (response) => { setOpinions(response.value) })
    }

    function getRecipeOwner() {
        recipesApi.getRecipeOwner(id, onGetRecipeOwnerSuccess);
    }

    function getUserFavCollection() {
        recipeCollectionsApi.getUserCollectionByName('Favourite', onGetUserCollectionByNameSuccess)
    }

    function getPrivateNote() {
        privateNotesApi.getPrivateNoteByRecipeId(id, (response) => {
            setNote(response.value); 
            setIsNoteLoaded(true)
        });
    }

    function onGetRecipeSuccess(response: any) {
        setRecipe(response.value);
        setIsLoaded(true);
        getOtherRecipes(response.value.categories);
    }

    function getOtherRecipes(categories: any) {
        const filter: RecipeSearchDto = buildRecipeSearchDto({
            categories: categories,
            recipesSort: { fieldName: "created", order: "DESC" }
        });
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
                    {renderMainColumnOrSpinner()}
                </div>
                <div className='basic-container-border p-3 ms-md-2'>
                    <OtherColumn recipes={otherRecipes} />
                </div>
            </div>
        )
    }

    function renderMainColumnOrSpinner() {
        if (isLoaded) {
            return renderMainRecipeColumn();
        }
        return <MySpinner />
    }

    function renderMainRecipeColumn() {
        return (
            <div className="mt-3 main">
                <MyImage src={recipe.image} height="auto" className="main-img" rounded />
                <ActionButtons recipe={recipe} isOwner={isOwner} user={user} favCollection={favRecipeCollection} />
                <MyHeader title={recipe.name} />
                <AuthorAndDate recipe={recipe} />
                {renderBreadcrumps()}
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
                <BreadCrumbs recipe={recipe} />
            </div>
        )
    }
}

export default RecipeDetails;