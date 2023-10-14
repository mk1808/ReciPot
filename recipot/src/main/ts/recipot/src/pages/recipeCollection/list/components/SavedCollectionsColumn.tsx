import { useTranslation } from "react-i18next";

import CollectionList from "./CollectionList";
import NewCollectionForm from "./NewCollectionForm";
import MyCollapse from "../../../../components/basicUi/MyCollapse";
import MyHeader from "../../../../components/basicUi/MyHeader";

function SavedCollectionsColumn() {
    const { t } = useTranslation();

    return (
        <>
            {renderAsColumn()}
            {renderAsCollapse()}
        </>
    );

    function renderAsColumn() {
        return (
            <div className='h-100 basic-container-border pb-3 px-3 hide-md'>
                <MyHeader title={t('p.savedCollections')} level="6" className='mt-6' />
                <br />
                {renderCollectionsColumn()}
            </div>
        );
    }

    function renderAsCollapse() {
        return (
            <div className="show-md">
                <MyCollapse header={t("p.savedCollections")}>
                    {renderCollectionsColumn()}
                </MyCollapse>
            </div>
        );
    }

    function renderCollectionsColumn() {
        return (
            <>
                <CollectionList />
                <hr />
                <NewCollectionForm />
            </>
        );
    }
}

export default SavedCollectionsColumn;