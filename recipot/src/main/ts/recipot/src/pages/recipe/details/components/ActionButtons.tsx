import { Col, Row } from "react-bootstrap";
import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import DeleteRecipeDialog from "./dialogs/DeleteRecipeDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import MyButton from "../../../../components/basicUi/MyButton";
import { useEffect, useState } from "react";
import { GiTurd } from "react-icons/gi";
import { Recipe } from "../../../../data/types";
import Tooltip from "../../../../components/basicUi/Tooltip";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BsCollectionFill, BsShare } from "react-icons/bs";

function ActionButtons({ recipe }: { recipe: Recipe }) {

    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    return (<>
        <Row className="align-center recipe-details-action-buttons">
            <Col md="7"></Col>
            <Col md="4">
                <Row>
                    <Col><Tooltip placement="bottom" title="Dodaj do kolekcji"><MyButton.Primary onClick={() => setShowModalAddToCollection(true)} className="round"><BsCollectionFill /></MyButton.Primary></Tooltip></Col>
                    <Col><Tooltip placement="bottom" title="Udostępnij"><MyButton.Primary onClick={() => setShowModalShare(true)} className="round"><BsShare /></MyButton.Primary></Tooltip></Col>
                    <Col><Tooltip placement="bottom" title="Usuń przepis"><MyButton.Primary onClick={() => setShowModalDelete(true)} className="round"><MdDeleteOutline /></MyButton.Primary></Tooltip></Col>
                    <Col><Tooltip placement="bottom" title="Zmień widoczność"><MyButton.Primary onClick={() => setShowModalChangeVisibility(true)} className="round" ><AiFillEye /></MyButton.Primary></Tooltip></Col>
                </Row>
            </Col>
        </Row>
        {renderDialogs()}
    </>)
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

export default ActionButtons;