import MyHeader from '../../../components/basicUi/MyHeader';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideOffcanvas from '../../../components/basicUi/SideOffcanvas';
import RecipeFiltersColumn from './components/RecipeFiltersColumn';
import FilteredRecipesColumn from './components/FilteredRecipesColumn';
import SavedRecipeFilters from './components/SavedRecipeFilters';
import { FormSave } from '../../../data/utilTypes';
import { getEmptyFormSave } from '../../../utils/FormInputUtils';
import FilteredRecipesPagination from './components/FilteredRecipesPagination';
import { RecipeFilterContextContextProvider } from './context/RecipeFilterContext';
import RecipesSortForm from './components/RecipesSortForm';
import { UsersContext } from '../../../context/UserContext';
import { useContext } from 'react';

function RecipeFilter() {

    const { t } = useTranslation();
    const user = useContext(UsersContext).user;

    const formSave: FormSave = getEmptyFormSave();

    formSave.onSubmit = function (formValue: any) {
        console.log(formValue)
    }

    formSave.onSuccess = function () {

    }

    formSave.onError = function () {

    }

    return (
        <RecipeFilterContextContextProvider>
            <div className='m-2 recipe-filter-page'>
                {renderColumns()}
                {renderSavedFiltersColumn()}
            </div>
        </RecipeFilterContextContextProvider>
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
        return (
            <div className='mt-5'>
                <h2>{t('p.recipesSort')}</h2>
                <RecipesSortForm />
                <hr />
                <h2>{t('p.recipeFilterForm')}</h2>
                <RecipeFiltersColumn formSave={formSave} />
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

    function renderSavedFiltersColumn() {
        return user && (
            <SideOffcanvas title={t('p.savedRecipeFilterHeader')}>
                <SavedRecipeFilters />
            </SideOffcanvas>
        )
    }
}

export default RecipeFilter;