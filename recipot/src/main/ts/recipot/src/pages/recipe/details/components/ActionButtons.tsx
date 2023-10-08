import { Stack } from "react-bootstrap";
import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import MyButton from "../../../../components/basicUi/MyButton";
import { useEffect, useState } from "react";
import { Recipe, RecipeCollection, RecipeCollectionItem } from "../../../../data/types";
import Tooltip from "../../../../components/basicUi/Tooltip";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsBalloonHeart, BsBalloonHeartFill, BsCollectionFill, BsShare } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FiEdit3 } from "react-icons/fi";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { initAs } from "../../../../utils/ObjectUtils";
import useAlerts from "../../../../hooks/useAlerts";
import useMyNav from "../../../../hooks/useMyNav";

type Props = {
    recipe: Recipe,
    favCollection: RecipeCollection,
    isOwner: boolean,
    user: any
};

function ActionButtons({
    recipe,
    favCollection,
    isOwner,
    user
}: Props) {

    const { t } = useTranslation();
    const alerts = useAlerts();
    const nav = useMyNav();
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
                () => { alerts.showSuccessAlert(t('p.recipeRemovedFromCollection')); setIsInFavCollection(false); })

            return;
        }
        const recipeCollectionItem: RecipeCollectionItem = initAs<RecipeCollectionItem>({ recipe: recipe })
        recipeCollectionsApi.addCollectionItem(favCollection.id, recipeCollectionItem,
            () => { alerts.showSuccessAlert(t('p.addedToCollection')); setIsInFavCollection(true); });
    }

    useEffect(() => {
        setAccessType(recipe.accessType);
        setIsUser(!!user);
        checkFavourite();
    }, [user])

    return (
        <>
            <Stack direction="horizontal" className="align-center action-buttons justify-content-end">
                {isUser &&
                    <div>
                        <Tooltip title={t(getAddToFavText())}>
                            <MyButton.Primary onClick={addOrRemoveFromFavourites} className="round mx-4">{getAddToFavIcon()}</MyButton.Primary>
                        </Tooltip>
                    </div>
                }
                {isUser &&
                    <div>
                        <Tooltip title={t('p.addToCollectionButton')}>
                            <MyButton.Primary onClick={() => setShowModalAddToCollection(true)} className="round mx-4"><BsCollectionFill /></MyButton.Primary>
                        </Tooltip>
                    </div>
                }
                {isUser &&
                    <div>
                        <Tooltip title={t('p.shareRecipeButton')}>
                            <MyButton.Primary onClick={() => setShowModalShare(true)} className="round mx-4"><BsShare /></MyButton.Primary>
                        </Tooltip>
                    </div>}

                {isOwner &&
                    <div>
                        <Tooltip title={t('p.editRecipeButton')}>
                            <MyButton.Primary onClick={() => nav.toRecipeEdit(recipe.id)} className="round mx-4"><FiEdit3 /></MyButton.Primary>
                        </Tooltip>
                    </div>}

                {isOwner &&
                    <div>
                        <Tooltip title={t('p.changeRecipeVisibilityButton')}>
                            <MyButton.Primary onClick={() => setShowModalChangeVisibility(true)} className="round mx-4" >{getAccessTypeIcon()}</MyButton.Primary>
                        </Tooltip>
                    </div>}
            </Stack>
            {renderDialogs()}
        </>
    )
    function renderDialogs() {
        return (
            <>
                <AddToCollectionDialog showModal={showModalAddToCollection} onClose={() => setShowModalAddToCollection(false)} data={recipe} />
                <ShareRecipeDialog showModal={showModalShare} onClose={() => setShowModalShare(false)} data={recipe} />
                <ChangeVisibilityDialog showModal={showModalChangeVisibility} onClose={() => setShowModalChangeVisibility(false)} handleSuccess={setAccessType} data={recipe} accessType={accessType} />
            </>
        )
    }
}

export default ActionButtons;