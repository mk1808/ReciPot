import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
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
import { OpinionDto, PrivateNote as PrivateNoteT, Recipe } from "../../../data/types";
import { initAs } from "../../../utils/ObjectUtils";
import { useEffect, useState } from "react";
import BreadCrumbs from "./components/BreadCrumbs";
import MyButton from "../../../components/basicUi/MyButton";
import AddToCollectionDialog from "./components/dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./components/dialogs/ShareRecipeDialog";
import DeleteRecipeDialog from "./components/dialogs/DeleteRecipeDialog";
import ChangeVisibilityDialog from "./components/dialogs/ChangeVisibilityDialog";
import { GiTurd } from "react-icons/gi";
import Tooltip from "../../../components/basicUi/Tooltip";
import ActionButtons from "./components/ActionButtons";
import recipesApi from "../../../api/RecipesApi";
import { useLocation, useParams } from "react-router-dom";
import opinionsApi from "../../../api/OpinionsApi";
import privateNotesApi from "../../../api/PrivateNotes";

function RecipeDetails() {
    const { t } = useTranslation();
    const params = useParams();
    const [recipe, setRecipe] = useState<any | Recipe>(initAs());
    const [opinions, setOpinions] = useState<any | OpinionDto[]>([]);
    const [note, setNote] = useState<any | PrivateNoteT>(initAs());
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNoteLoaded, setIsNoteLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        let id: string = params.id ?? "";
        let b = {}
        console.log(params)
        recipesApi.getRecipe(id, (response) => { setRecipe(response.value); setIsLoaded(true); })
        opinionsApi.getRecipeOpinions(id, (response)=>{ setOpinions(response.value)})
        privateNotesApi.getPrivateNoteByRecipeId(id, (response)=>{ setNote(response.value); setIsNoteLoaded(true)})
    }, [])

    const recipes = [{}, {}, {}, {}, {}, {}, {}]

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
                        <OtherColumn />
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
                {renderBreadcrumps()}
                <BasicInfo recipe={recipe} />
                <hr />
                <IngredientList recipe={recipe} />
                <hr />
                <Steps recipe={recipe}/>
                <hr />
                {isNoteLoaded && <PrivateNote recipe={recipe} note={note} />}
                <hr />
                <Comments recipe={recipe} opinions={opinions} />

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