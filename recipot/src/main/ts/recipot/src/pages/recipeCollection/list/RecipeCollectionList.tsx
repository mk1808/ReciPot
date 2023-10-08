import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CollectionRecipesColumn from './components/CollectionRecipesColumn';
import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/NewCollectionForm';
import { RecipeCollectionListContextProvider } from './context/RecipeCollectionListContext';
import CollectionRecipesPagination from './components/CollectionRecipesPagination';
import MyCollapse from '../../../components/basicUi/MyCollapse';
import MyHeader from '../../../components/basicUi/MyHeader';

function RecipeCollectionList() {
    const { t } = useTranslation();


    return (
        <RecipeCollectionListContextProvider>
            <div className='m-2 recipe-collections-list-page'>
                {renderColumns()}
            </div>
        </RecipeCollectionListContextProvider>
    );

    function renderColumns() {
        return (
            <Row className='gx-2 m-3'>
                <Col xs={12} md={3} className='collections-column'>
                    <div className='h-100 basic-container-border pb-3 px-3'>{renderCollectionsColumnOrCollapse()}</div>
                </Col>
                <Col>
                    <div className='h-100 container-fluid basic-container-border'>{renderContent()}</div>
                </Col>
            </Row>
        )
    }

    function renderCollectionsColumnOrCollapse() {
        return (
            <>
                <div className='h-100 pb-3 px-3 hide-md'>
                    <MyHeader title={t('p.savedCollections')} level="6" className='mt-6' />
                    <br />
                    {renderCollectionsColumn()}
                </div>
                <div className="show-md"><MyCollapse header={t("p.savedCollections")}>{renderCollectionsColumn()}</MyCollapse></div>
            </>
        )
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

    function renderContent() {
        return (
            <div className='content-column'>
                <CollectionRecipesColumn />
                <CollectionRecipesPagination />
            </div>
        );
    }
}

export default RecipeCollectionList;