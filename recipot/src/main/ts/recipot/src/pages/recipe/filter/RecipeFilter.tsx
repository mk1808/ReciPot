import MyHeader from '../../../components/basicUi/MyHeader';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideOffcanvas from '../../../components/basicUi/SideOffcanvas';
import RecipeFiltersColumn from './components/RecipeFiltersColumn';
import FilteredRecipesColumn from './components/FilteredRecipesColumn';
import SavedRecipeFilters from './components/SavedRecipeFilters';
import VerticalPagination from '../../../components/complex/VerticalPagination';

function RecipeFilter() {
    const { t } = useTranslation();
    return (
        <div className='m-2 recipe-filter-page'>
            {renderColumns()}
            {renderSavedFiltersColumn()}
        </div>
    );

    function renderColumns() {
        return (
            <Row className='gx-2 m-3'>
                <Col sm={3}>
                    <div className='h-100 basic-container-border'>{renderFiltersColumn()}</div>
                </Col>
                <Col sm={9}>
                    <div className='h-100 container-fluid basic-container-border'>{renderContent()}</div>
                </Col>
            </Row>
        )
    }

    function renderFiltersColumn() {
        return (<>
            <h2>{t('p.recipeFilterForm')}</h2>
            <RecipeFiltersColumn />
        </>);
    }

    function renderContent() {
        return (
            <div className='content-column'>
                {renderHeader()}
                <FilteredRecipesColumn />
                <VerticalPagination totalPages={100} actualPage={3} pageButtonsToShow={6} onPageSelect={() => { }} />
            </div>
        );
    }

    function renderHeader() {
        return (
            <>
                <MyHeader title={t('p.recipeFilterHeader')}></MyHeader>
            </>
        );
    }

    function renderSavedFiltersColumn() {
        return (
            <SideOffcanvas title={t('p.savedRecipeFilterHeader')}>
                <SavedRecipeFilters />
            </SideOffcanvas>
        )
    }
}

export default RecipeFilter;