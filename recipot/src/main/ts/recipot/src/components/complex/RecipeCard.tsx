import { forwardRef } from "react";
import { Card, Col, Row, Stack } from 'react-bootstrap';
import './styles.scss';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { renderCategories, renderMore, renderRating } from './RecipeCardCommonElements';
import { getShorterText } from '../../utils/TextUtils';
import HashTagList from '../basicUi/HashTagList';
import { onImageLoadError } from "../../utils/RestUtils";
import useMyNav from "../../hooks/useMyNav";

type Props = {
    recipe: Recipe,
    onGoToRecipe: (recipe: Recipe, event?: any) => any,
    className?: string,
    additionalFunctionElement?: any
};

function RecipeCard({
    recipe,
    onGoToRecipe,
    className,
    additionalFunctionElement
}: Props,
    ref: any) {

    const { t } = useTranslation();

    const nav = useMyNav();

    function onHashTagClick(hashTag: any) {
        nav.goToFilters({ hashTags: [{ label: hashTag.name, value: hashTag }] });
    }

    return (
        <Card className={`recipe-card mb-2 ${(className || "me-2")}`} ref={ref}>
            <Card.Img variant="top" src={recipe.image} height={180} onError={onImageLoadError} />
            <Card.Body className="body">
                {renderCardBody()}
            </Card.Body>
        </Card >
    );

    function renderCardBody() {
        return (
            <>
                {renderTitle()}
                {renderContent()}
                {renderFooter()}
            </>
        );
    }

    function renderTitle() {
        return <Card.Title> {recipe.name} </Card.Title>
    }

    function renderContent() {
        return (
            <div className='mb-3'>
                {renderCategoryRow()}
                {renderHashTags()}
                {renderRating(recipe, t('p.numberOfRatings'))}
                <div className="description"> {getShorterText(recipe.description, 60)} </div>
            </div>
        );
    }

    function renderFooter() {
        return <MyButton.Primary onClick={(event: any) => onGoToRecipe(recipe, event)} className="full-width">{t('p.goToRecipe')}</MyButton.Primary>;
    }

    function renderCategoryRow() {
        return (
            <Row>
                <Col>
                    {renderCategories(recipe)}
                </Col>
                {renderAdditionalFunctionElement()}
            </Row>
        )
    }

    function renderHashTags() {
        return (
            <Stack direction="horizontal">
                <HashTagList hashTags={recipe.hashTags.slice(0, 1)} onClick={onHashTagClick} />
                {renderMore(recipe.hashTags)}
            </Stack>
        )
    };

    function renderAdditionalFunctionElement() {
        return additionalFunctionElement && <Col md={3}>{additionalFunctionElement}</Col>;
    }
}

export default forwardRef(RecipeCard);