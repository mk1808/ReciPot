import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
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

function RecipeDetails() {
    const { t } = useTranslation();
    const params = useParams();
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const [otherRecipes, setOtherRecipes] = useState<Recipe[]>([]);
    const [opinions, setOpinions] = useState<any | OpinionDto[]>([]);
    const [note, setNote] = useState<any | PrivateNoteT>(initAs());
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNoteLoaded, setIsNoteLoaded] = useState<boolean>(false);
    const id: string  = params.id ?? "";
    const user = useContext(UsersContext).user;

    useEffect(() => {
        console.log(params)
        recipesApi.getRecipe(id, onGetRecipeSuccess)
        getOpinions(id);

    }, [])
    useEffect(() => {
        if (user) {
            privateNotesApi.getPrivateNoteByRecipeId(id, (response) => { setNote(response.value); setIsNoteLoaded(true) }, (errorResponse) => { console.log(errorResponse) });
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
    return (
        <div className='m-2 recipe-details-page'>
            {renderColumns()}
        </div>
    );

    function renderColumns() {
        return (
            <Row className='gx-2 m-3'>
                <Col md={7} className="offset-md-2">
                    <div className='basic-container-border p-3'>
                        {isLoaded && renderMainRecipeColumn()}
                    </div>
                </Col>
                <Col md={2}>
                    <div className='h-100 basic-container-border p-3'>
                        <OtherColumn recipes={otherRecipes} />
                    </div>
                </Col>
                <Col md={1}></Col>
            </Row>
        )
    }

    function renderMainRecipeColumn() {
        return (
            <div className="mt-3 main">
                <MyImage src={recipe.image} height="auto" className="main-img" rounded></MyImage>
                <ActionButtons recipe={recipe} />
                <MyHeader title={recipe.name}></MyHeader>
                <Row>
                    <Col md={5}>{renderBreadcrumps()}</Col>
                    <Col md={1}></Col>
                    <Col md={6}><Rating recipe={recipe}></Rating></Col>
                </Row>
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