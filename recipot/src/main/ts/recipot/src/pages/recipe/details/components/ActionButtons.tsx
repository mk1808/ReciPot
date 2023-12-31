import { useEffect, useState, useMemo } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsBalloonHeart, BsBalloonHeartFill, BsCollectionFill, BsShare } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

import AddToCollectionDialog from "./dialogs/AddToCollectionDialog";
import ChangeVisibilityDialog from "./dialogs/ChangeVisibilityDialog";
import ShareRecipeDialog from "./dialogs/ShareRecipeDialog";
import RoundButton from "./RoundButton";
import recipeCollectionsApi from "../../../../api/RecipeCollectionsApi";
import { Recipe, RecipeCollection, RecipeCollectionItem } from "../../../../data/types";
import { ActionButtonAttrs } from "../../../../data/utilTypes";
import useAlerts from "../../../../hooks/useAlerts";
import useMyNav from "../../../../hooks/useMyNav";
import { initAs } from "../../../../utils/ObjectUtils";

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
    const [showModalAddToCollection, setShowModalAddToCollection] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalChangeVisibility, setShowModalChangeVisibility] = useState(false);
    const [accessType, setAccessType] = useState("PRIVATE");
    const [isUser, setIsUser] = useState(false);
    const [isInFavCollection, setIsInFavCollection] = useState(false);

    const alerts = useAlerts();
    const nav = useMyNav();

    const getAccessTypeIcon = () => (accessType === "PRIVATE" ? <AiFillEyeInvisible /> : <AiFillEye />)
    const getAddToFavIcon = () => (isInFavCollection ? <BsBalloonHeartFill /> : <BsBalloonHeart />)
    const getAddToFavText = () => (isInFavCollection ? 'p.removeFromFavouriteButton' : 'p.addToFavouriteButton')

    const actionButtons = useMemo(getActionButtons, [isUser, isOwner, isInFavCollection, accessType])

    useEffect(() => {
        setAccessType(recipe.accessType);
        setIsUser(!!user);
        checkFavourite();
    }, [user])

    function checkFavourite() {
        let items = favCollection?.recipeCollectionItems;
        let isInFav = items && items.length > 0 && items.filter((item) => item.recipe.id === recipe.id).length > 0;
        setIsInFavCollection(isInFav);
    }

    function onToggleFavourites() {
        if (isInFavCollection) {
            recipeCollectionsApi.deleteRecipeFromCollection(favCollection.id, recipe.id, onDeleteSuccess)
            return;
        }
        const recipeCollectionItem: RecipeCollectionItem = initAs<RecipeCollectionItem>({ recipe: recipe })
        recipeCollectionsApi.addCollectionItem(favCollection.id, recipeCollectionItem, onAddSuccess);
    }

    function onDeleteSuccess() {
        alerts.showSuccessAlert(t('p.recipeRemovedFromCollection'));
        setIsInFavCollection(false);
    }

    function onAddSuccess() {
        alerts.showSuccessAlert(t('p.addedToCollection'));
        setIsInFavCollection(true);
    }

    function getActionButtons(): ActionButtonAttrs[] {
        return [
            {
                tooltipText: t(getAddToFavText()),
                onClick: onToggleFavourites,
                shouldShow: isUser,
                children: getAddToFavIcon()
            },
            {
                tooltipText: t('p.addToCollectionButton'),
                onClick: () => setShowModalAddToCollection(true),
                shouldShow: isUser,
                children: <BsCollectionFill />
            },
            {
                tooltipText: t('p.shareRecipeButton'),
                onClick: () => setShowModalShare(true),
                shouldShow: isUser,
                children: <BsShare />
            },
            {
                tooltipText: t('p.editRecipeButton'),
                onClick: () => nav.toRecipeEdit(recipe.id),
                shouldShow: isOwner,
                children: <FiEdit3 />
            },
            {
                tooltipText: t('p.changeRecipeVisibilityButton'),
                onClick: () => setShowModalChangeVisibility(true),
                shouldShow: isOwner,
                children: getAccessTypeIcon()
            }
        ];
    }

    return (
        <>
            <Stack direction="horizontal" className="align-center action-buttons justify-content-end">
                {actionButtons.map(renderSingleButton)}
            </Stack>
            {renderDialogs()}
        </>
    )

    function renderSingleButton(buttonAttrs: ActionButtonAttrs) {
        return <RoundButton key={buttonAttrs.tooltipText} {...buttonAttrs} />
    }

    function renderDialogs() {
        return (
            <>
                <AddToCollectionDialog
                    showModal={showModalAddToCollection}
                    onClose={() => setShowModalAddToCollection(false)}
                    data={recipe} />
                <ShareRecipeDialog
                    showModal={showModalShare}
                    onClose={() => setShowModalShare(false)}
                    data={recipe} />
                <ChangeVisibilityDialog
                    showModal={showModalChangeVisibility}
                    onClose={() => setShowModalChangeVisibility(false)}
                    handleSuccess={setAccessType}
                    data={recipe}
                    accessType={accessType} />
            </>
        )
    }
}

export default ActionButtons;