import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CollectionRecipesColumn from './components/CollectionRecipesColumn';
import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/NewCollectionForm';
import { RecipeCollectionListContextProvider } from './context/RecipeCollectionListContext';
import CollectionRecipesPagination from './components/CollectionRecipesPagination';

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
                <Col sm={3}>
                    <div className='h-100 basic-container-border p-3'>{renderCollectionsColumn()}</div>
                </Col>
                <Col sm={9}>
                    <div className='h-100 container-fluid basic-container-border'>{renderContent()}</div>
                </Col>
            </Row>
        )
    }

    function renderCollectionsColumn() {
        return (<>
            <h2>{t('p.savedCollections')}</h2>
            <br />
            <CollectionList />
            <hr />
            <NewCollectionForm />
        </>);
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