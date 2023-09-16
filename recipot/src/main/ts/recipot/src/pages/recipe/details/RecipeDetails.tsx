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
import { Recipe } from "../../../data/types";
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

function RecipeDetails() {
    const { t } = useTranslation();

    const recipes = [{}, {}, {}, {}, {}, {}, {}]

    const recipe = initAs<Recipe>(
        {
            id: "osidj-oeifj-9239",
            name: "Sałatka warzywna",
            accessType: "PUBLIC",
            averageRating: 4.5,
            ratingsCount: 110,
            categories: [{ id: "1", name: "Sałatki", image: "", parentCategory: { id: "6", name: "Przekąski", image: "" } }, { id: "2", name: "Zdrowe", image: "" }],
            hashTags: [{ id: "1", name: "Obiady" }, { id: "2", name: "Zupy" }, { id: "3", name: "Zdrowe" }],
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg"
        });
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
                        {renderMainRecipeColumn()}
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
                <ActionButtons recipe={recipe}/>
                <MyHeader title={recipe.name}></MyHeader>
                {renderBreadcrumps()}
                <BasicInfo recipe={recipe} />
                <hr />
                <IngredientList />
                <hr />
                <Steps />
                <hr />
                <PrivateNote />
                <hr />
                <Comments />

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