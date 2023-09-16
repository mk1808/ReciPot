import { Col, Row, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";
import MyButton from "../../../../components/basicUi/MyButton";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import DeleteRecipeDialog from "./dialogs/DeleteRecipeDialog";
import { MdAccessTime, MdWork } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import { VscTools } from "react-icons/vsc";
import Info from "../../../../components/basicUi/Info";

function BasicInfo({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    return (
        <div className="mt-3 mb-5 px-5 basic-info">
            <div className="my-4">
                {recipe.description}
            </div>

            <Row className="mb-5">
                <Col className="border-right">

                    <Row className="align-center icon-info">
                        <Col>

                            <Info value={t('p.privateNoteInfo')} className="icon" renderIcon={(className: string) => <MdAccessTime className={className} />} /><br />
                            <strong> Czas</strong> <br />
                            30 min
                        </Col>
                        <Col>
                            <Info value={t('p.privateNoteInfo')} className="icon" renderIcon={(className: string) => <GiCookingPot className={className} />} /><br />
                            <strong> Ilość naczyń</strong> <br />
                            duża
                        </Col>
                        <Col>
                            <Info value={t('p.privateNoteInfo')} className="icon" renderIcon={(className: string) => <MdWork className={className} />} /><br />
                            <strong>   Pracochłonność</strong> <br />
                            średnia
                        </Col>
                        <Col>
                            <Info value={t('p.privateNoteInfo')} className="icon" renderIcon={(className: string) => <VscTools className={className} />} /><br />
                            <strong>   Skomplikowanie</strong><br />
                            średnie

                        </Col>
                    </Row>

                </Col>

            </Row>
            <Row className="align-center">
                <Col className="border-left">
                    <div className="test">
                        <MyButton.Primary onClick={() => setShowModalAddToCollection(true)} className="action-btn">Dodaj do kolekcji</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalShare(true)} className="action-btn">Udostępnij</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalDelete(true)} className="action-btn">Usuń przepis</MyButton.Primary>
                        <MyButton.Primary onClick={() => setShowModalChangeVisibility(true)} className="action-btn" >Zmień widoczność</MyButton.Primary>
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