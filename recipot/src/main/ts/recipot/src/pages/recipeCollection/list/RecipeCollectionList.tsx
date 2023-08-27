import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyHeader from '../../../components/basicUi/MyHeader';
import VerticalPagination from '../../../components/complex/VerticalPagination';
import CollectionRecipesColumn from './components/CollectionRecipesColumn';
import CollectionList from './components/CollectionList';
import NewCollectionForm from './components/NewCollectionForm';
import { FormSave } from '../../../data/utilTypes';
import { getEmptyFormSave } from '../../../utils/FormInputUtils';

function RecipeCollectionList() {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (formValue: any) {
        console.log(formValue);
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

    }

    return (
        <div className='m-2 recipe-collections-list-page'>
            {renderColumns()}
        </div>
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
            <NewCollectionForm formSave={formSave} />
        </>);
    }

    function renderContent() {
        return (
            <div className='content-column'>
                {renderHeader()}
                <CollectionRecipesColumn />
                <VerticalPagination totalPages={100} actualPage={3} pageButtonsToShow={6} onPageSelect={() => { }} />
            </div>
        );
    }

    function renderHeader() {
        return (
            <>
                <MyHeader title={t('p.recipeCollectionListHeader')}></MyHeader>
            </>
        );
    }
}

export default RecipeCollectionList;