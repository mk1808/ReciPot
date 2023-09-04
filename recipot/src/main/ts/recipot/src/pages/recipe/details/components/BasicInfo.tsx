import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";
import MyButton from "../../../../components/basicUi/MyButton";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import DeleteRecipeDialog from "./dialogs/DeleteRecipeDialog";

function BasicInfo({ recipe }: { recipe: Recipe }) {
    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    return (
        <div className="mt-3 mb-5 px-5 basic-info">
            <div className="my-4">
                {recipe.description}
            </div>
            <Row>
                <Col className="border-right">
                    <div className="test"></div>
                </Col>
                <Col className="border-left">
                    <div className="test">
                        <MyButton.Primary onClick={() => setShowModalAddToCollection(true)}>Dodaj do kolekcji</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalShare(true)}>Udostępnij</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalDelete(true)}>Usuń przepis</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalChangeVisibility(true)}>Zmień widoczność</MyButton.Primary>
                        {renderDialogs()}
                    </div>
                </Col>
            </Row>
        </div>
    )
    function renderDialogs() {
        return (
            <>
                <AddToCollectionDialog showModal={showModalAddToCollection} handleClose={() => setShowModalAddToCollection(false)}></AddToCollectionDialog>
                <ShareRecipeDialog showModal={showModalShare} handleClose={() => setShowModalShare(false)}></ShareRecipeDialog>
                <DeleteRecipeDialog showModal={showModalDelete} handleClose={() => setShowModalDelete(false)} data={recipe}></DeleteRecipeDialog>
                <ChangeVisibilityDialog showModal={showModalChangeVisibility} handleClose={() => setShowModalChangeVisibility(false)} data={recipe}></ChangeVisibilityDialog>
                
            </>
        )
    }
}

export default BasicInfo;