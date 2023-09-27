import { useContext, useRef } from "react";
import { Col, Row, Stack } from "react-bootstrap";
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
import { AppUser, OpinionDto, PrivateNote as PrivateNoteT, Recipe, RecipeSearchDto } from "../../../data/types";
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

function RecipeDetails() {
    const { t } = useTranslation();
    const params = useParams();
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const [otherRecipes, setOtherRecipes] = useState<Recipe[]>([]);
    const [opinions, setOpinions] = useState<any | OpinionDto[]>([]);
    const [note, setNote] = useState<any | PrivateNoteT>(initAs());
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNoteLoaded, setIsNoteLoaded] = useState<boolean>(false);
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

    }, [params])
    useEffect(() => {
        if (user) {
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
    function onGetRecipeOwnerSuccess(response:any){
        let owner = response.value;
        setIsOwner(!!user && owner.id === user?.id);
    }
    return (
        <div className='m-2 recipe-details-page'>
            {renderColumns()}
        </div>
    );
    function renderColumns() {
        return (
            <Stack direction="horizontal" className="align-items-stretch details-container container" gap={2}>
                <div className='basic-container-border p-3 main-container' ref={mainRef} >
                    {isLoaded && renderMainRecipeColumn()}
                </div>
                <div className='basic-container-border p-3'>
                    <OtherColumn recipes={otherRecipes} />
                </div>
            </Stack>
        )
    }

    function renderMainRecipeColumn() {
        return (
            <div className="mt-3 main">
                <MyImage src={recipe.image} height="auto" className="main-img" rounded></MyImage>
                <ActionButtons recipe={recipe} isOwner={isOwner} user={user} />
                <MyHeader title={recipe.name}></MyHeader>
                <Stack direction="horizontal" className="justify-content-between">
                    <div>{renderBreadcrumps()}</div>
                    <div><Rating recipe={recipe} /></div>
                </Stack>
                <BasicInfo recipe={recipe} />
                <hr />
                <IngredientList recipe={recipe} />
                <hr />
                <Steps recipe={recipe} />
                {isNoteLoaded && <>
                    <hr />
                    <PrivateNote recipe={recipe} note={note} />
                </>
                }
                <hr />
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

}

export default RecipeDetails;