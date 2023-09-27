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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsCollectionFill, BsShare } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ActionButtons({ recipe, isOwner, user }: { recipe: Recipe, isOwner: boolean, user: any }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    const [accessType, setAccessType] = useState("PRIVATE");
    const [isUser, setIsUser] = useState(false);
    const getAccessTypeIcon = () => { return (accessType === "PRIVATE" ? <AiFillEyeInvisible /> : <AiFillEye />) }

    useEffect(() => {
        setAccessType(recipe.accessType);
        setIsUser(!!user);
    }, [])

    return (<>
        <Row className="align-center action-buttons">
            <Col md="7"></Col>
            <Col md="5">
                <Row>
                    {!isOwner && <Col></Col>}
                    {!isOwner && <Col></Col>}
                    {isUser &&
                        <Col>
                            <Tooltip placement="bottom" title={t('p.addToCollectionButton')}><MyButton.Primary onClick={() => setShowModalAddToCollection(true)} className="round"><BsCollectionFill /></MyButton.Primary>
                            </Tooltip>
                        </Col>
                    }
                    {isUser &&
                        <Col>
                            <Tooltip placement="bottom" title={t('p.shareRecipeButton')}><MyButton.Primary onClick={() => setShowModalShare(true)} className="round"><BsShare /></MyButton.Primary>
                            </Tooltip>
                        </Col>}

                    {isOwner &&
                        <Col>
                            <Tooltip placement="bottom" title={t('p.editRecipeButton')}><MyButton.Primary onClick={() => navigate(`/recipe/add/${recipe.id}`)} className="round"><FiEdit3 /></MyButton.Primary>
                            </Tooltip>
                        </Col>}

                    {isOwner &&
                        <Col>
                            <Tooltip placement="bottom" title={t('p.changeRecipeVisibilityButton')}><MyButton.Primary onClick={() => setShowModalChangeVisibility(true)} className="round" >{getAccessTypeIcon()}</MyButton.Primary>
                            </Tooltip>
                        </Col>}
                </Row>
            </Col>
        </Row>
        {renderDialogs()}
    </>)
    function renderDialogs() {
        return (
            <>
                <AddToCollectionDialog showModal={showModalAddToCollection} handleClose={() => setShowModalAddToCollection(false)} data={recipe}></AddToCollectionDialog>
                <ShareRecipeDialog showModal={showModalShare} handleClose={() => setShowModalShare(false)} data={recipe}></ShareRecipeDialog>
                <ChangeVisibilityDialog showModal={showModalChangeVisibility} handleClose={() => setShowModalChangeVisibility(false)} handleSuccess={setAccessType} data={recipe} accessType={accessType}></ChangeVisibilityDialog>

            </>
        )
    }
}

export default ActionButtons;