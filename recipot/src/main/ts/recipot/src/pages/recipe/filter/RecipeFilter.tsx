import MyHeader from '../../../components/basicUi/MyHeader';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideOffcanvas from '../../../components/basicUi/SideOffcanvas';
import RecipeFiltersColumn from './components/RecipeFiltersColumn';
import FilteredRecipesColumn from './components/FilteredRecipesColumn';
import SavedRecipeFilters from './components/SavedRecipeFilters';
import FilteredRecipesPagination from './components/FilteredRecipesPagination';
import { RecipeFilterContextContextProvider } from './context/RecipeFilterContext';
import RecipesSortForm from './components/RecipesSortForm';
import { UsersContext } from '../../../context/UserContext';
import { useContext } from 'react';
import MyCollapse from '../../../components/basicUi/MyCollapse';

function RecipeFilter() {

    const { t } = useTranslation();
    const userContext = useContext(UsersContext);
    const isUserLogged = !!userContext.user;

    return (
        <RecipeFilterContextContextProvider>
            <div className='m-2 recipe-filter-page'>
                {renderColumns()}
            </div>
        </RecipeFilterContextContextProvider>
    );

    function renderColumns() {
        return (
            <div className='d-flex flex-lg-row flex-column align-items-stretch'>
                <div>
                    {renderFilterColumnsOrCollapse()}
                    {renderSavedFiltersColumnOrCollapse()}
                </div>
                <div className='ms-lg-2 full-width'>
                    <div className='basic-container-border full-height'>{renderContent()}</div>
                </div>
            </div>
        )
    }

    function renderFilterColumnsOrCollapse() {
        return (
            <>
                <div className="show-lg"><MyCollapse header={t("p.filtersAndSort")}>{renderFiltersColumn()}</MyCollapse></div>
                <div className="hide-lg full-height filter-column-width">{renderFiltersColumn()}</div>
            </>
        )
    }

    function renderFiltersColumn() {
        return (
            <div className='pt-5 basic-container-border full-height'>
                <h2>{t('p.recipesSort')}</h2>
                <RecipesSortForm />
                <hr />
                <h2>{t('p.recipeFilterForm')}</h2>
                <RecipeFiltersColumn />
            </div>
        );
    }

    function renderContent() {
        return (
            <div className='content-column'>
                {renderHeader()}
                <FilteredRecipesColumn />
                <FilteredRecipesPagination />
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

    function renderSavedFiltersColumnOrCollapse() {
        return isUserLogged && (
            <>
                <div className="show-lg"><MyCollapse header={t("p.savedRecipeFilterHeader")}><SavedRecipeFilters /></MyCollapse></div>
                <div className="hide-lg">{renderSavedFiltersColumn()}</div>
            </>
        )
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