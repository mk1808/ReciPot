import './styles.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CollectionRecipesColumn from './components/CollectionRecipesColumn';
import { RecipeCollectionListContextProvider } from './context/RecipeCollectionListContext';
import CollectionRecipesPagination from './components/CollectionRecipesPagination';
import SavedCollectionsColumn from './components/SavedCollectionsColumn';

function RecipeCollectionList() {

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
                <Col xs={12} md={3} className='collections-column '>
                    <SavedCollectionsColumn />
                </Col>
                <Col>
                    {renderContent()}
                </Col>
            </Row>
        )
    }

    function renderContent() {
        return (
            <div className='h-100 container-fluid basic-container-border content-column'>
                <CollectionRecipesColumn />
                <CollectionRecipesPagination />
            </div>
        );
    }
}

export default RecipeCollectionList;