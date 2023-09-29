import { Col, Row, Stack } from "react-bootstrap";
import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import DeleteRecipeDialog from "./dialogs/DeleteRecipeDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import MyButton from "../../../../components/basicUi/MyButton";
import { useEffect, useState, useContext } from "react";
import { GiTurd } from "react-icons/gi";
import { Recipe, RecipeCollection, RecipeCollectionItem } from "../../../../data/types";
import Tooltip from "../../../../components/basicUi/Tooltip";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsBalloonHeart, BsBalloonHeartFill, BsCollectionFill, BsShare } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { initAs } from "../../../../utils/ObjectUtils";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { showSuccessAlert } from "../../../../utils/RestUtils";

function ActionButtons({ recipe, favCollection, isOwner, user }: { recipe: Recipe, favCollection: RecipeCollection, isOwner: boolean, user: any }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const alertDispatch = useContext(AlertsDispatchContext);
    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    const [accessType, setAccessType] = useState("PRIVATE");
    const [isUser, setIsUser] = useState(false);
    const [isInFavCollection, setIsInFavCollection] = useState(false);
    const getAccessTypeIcon = () => { return (accessType === "PRIVATE" ? <AiFillEyeInvisible /> : <AiFillEye />) }
    const getAddToFavIcon = () => { return (isInFavCollection ? <BsBalloonHeartFill /> : <BsBalloonHeart />) }
    const getAddToFavText = () => { return (isInFavCollection ? 'p.removeFromFavouriteButton' : 'p.addToFavouriteButton') }
    const checkFavourite = () => {
        let items = favCollection?.recipeCollectionItems;
        let isInFav = items && items.length > 0 && items.filter((item) => item.recipe.id === recipe.id).length > 0;
        setIsInFavCollection(isInFav);
    }
    const addOrRemoveFromFavourites = () => {
        if (isInFavCollection) {
            recipeCollectionsApi.deleteRecipeFromCollection(favCollection.id, recipe.id,
                () => { showSuccessAlert(t('p.recipeRemovedFromCollection'), alertDispatch); setIsInFavCollection(false); })

            return;
        }
        const recipeCollectionItem: RecipeCollectionItem = initAs<RecipeCollectionItem>({ recipe: recipe })
        recipeCollectionsApi.addCollectionItem(favCollection.id, recipeCollectionItem,
            () => { showSuccessAlert(t('p.addedToCollection'), alertDispatch); setIsInFavCollection(true); });
    }

    useEffect(() => {
        setAccessType(recipe.accessType);
        setIsUser(!!user);
        checkFavourite();
    }, [])

    return (<>
        <Stack direction="horizontal" className="align-center action-buttons justify-content-end">



            {isUser &&
                <div>
                    <Tooltip placement="bottom" title={t(getAddToFavText())}>
                        <MyButton.Primary onClick={addOrRemoveFromFavourites} className="round mx-4">{getAddToFavIcon()}</MyButton.Primary>
                    </Tooltip>
                </div>
            }
            {isUser &&
                <div>
                    <Tooltip placement="bottom" title={t('p.addToCollectionButton')}>
                        <MyButton.Primary onClick={() => setShowModalAddToCollection(true)} className="round mx-4"><BsCollectionFill /></MyButton.Primary>
                    </Tooltip>
                </div>
            }
            {isUser &&
                <div>
                    <Tooltip placement="bottom" title={t('p.shareRecipeButton')}>
                        <MyButton.Primary onClick={() => setShowModalShare(true)} className="round mx-4"><BsShare /></MyButton.Primary>
                    </Tooltip>
                </div>}

            {isOwner &&
                <div>
                    <Tooltip placement="bottom" title={t('p.editRecipeButton')}>
                        <MyButton.Primary onClick={() => navigate(`/recipes/edit/${recipe.id}`)} className="round mx-4"><FiEdit3 /></MyButton.Primary>
                    </Tooltip>
                </div>}

            {isOwner &&
                <div>
                    <Tooltip placement="bottom" title={t('p.changeRecipeVisibilityButton')}>
                        <MyButton.Primary onClick={() => setShowModalChangeVisibility(true)} className="round mx-4" >{getAccessTypeIcon()}</MyButton.Primary>
                    </Tooltip>
                </div>}


        </Stack>
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