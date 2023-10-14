import './styles.scss';
import { useTranslation } from 'react-i18next';

import FilteredRecipesColumn from './components/FilteredRecipesColumn';
import FilteredRecipesPagination from './components/FilteredRecipesPagination';
import SavedRecipeFiltersColumn from './components/SavedRecipeFiltersColumn';
import SortAndFiltersColumn from './components/SortAndFiltersColumn';
import { RecipeFilterContextContextProvider } from './context/RecipeFilterContext';
import MyHeader from '../../../components/basicUi/MyHeader';

function RecipeFilter() {
    const { t } = useTranslation();

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
                {renderSideColumns()}
                {renderMainColumn()}
            </div>
        )
    }

    function renderSideColumns() {
        return (
            <div>
                <SortAndFiltersColumn />
                <SavedRecipeFiltersColumn />
            </div>
        );
    }

    function renderMainColumn() {
        return (
            <div className='ms-lg-2 full-width'>
                <div className='basic-container-border full-height'>
                    {renderContent()}
                </div>
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
        return <MyHeader title={t('p.recipeFilterHeader')} />
    }
}

export default RecipeFilter;