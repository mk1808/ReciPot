import './styles.scss';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyHeader from '../../../components/basicUi/MyHeader';
import VerticalPagination from '../../../components/complex/VerticalPagination';
import CollectionRecipesColumn from './components/CollectionRecipesColumn';
import CollectionList from './components/CollectionList';
import MyButton from '../../../components/basicUi/MyButton';
import { FaPlus } from "react-icons/fa6";
import { Stack } from "react-bootstrap";
import MyInput from '../../../components/basicUi/MyInput';

function RecipeCollectionList() {
    const { t } = useTranslation();
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
            <CollectionList />
            <hr />
            {renderNewCollectionForm()}
        </>);
    }

    function renderNewCollectionForm() {
        return (
            <Stack>
                <MyButton.Primary><FaPlus /></MyButton.Primary>
                <MyInput name="newCollectionName" placeholder="Wprowadź nazwę nowej kolekcji" label='Wprowadź nazwę nowej kolekcji' onChange={(value: string) => console.log(value)} />
                <MyButton.Primary>{t('p.save')}</MyButton.Primary>
            </Stack>
        )
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