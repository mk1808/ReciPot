import { forwardRef } from "react";
import { Card, Col, Row, Stack } from 'react-bootstrap';
import './styles.scss';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { initFcn } from '../../utils/ObjectUtils';
import { renderCategories, renderMore, renderRating } from './RecipeCardCommonElements';
import { getShorterText } from '../../utils/TextUtils';
import HashTagList from '../basicUi/HashTagList';
import { onImageLoadError } from "../../utils/RestUtils";
import useMyNav from "../../hooks/useMyNav";

function RecipeCard({
    recipe,
    recipeCallback = initFcn<Recipe>(),
    className,
    additionalFunctionElement
}: {
    recipe: Recipe,
    recipeCallback: Function,
    className?: string,
    additionalFunctionElement?: any
}, ref: any) {
    const { t } = useTranslation();
    const nav = useMyNav();

    function onHashTagClick(hashTag: any) {
        nav.goToFilters({ hashTags: [{ label: hashTag.name, value: hashTag }] });
    }

    return (
        <Card className={`recipe-card mb-2 ${(className || "me-2")}`} ref={ref}>
            <Card.Img variant="top" src={recipe.image} height={180} onError={onImageLoadError} />
            <Card.Body className="body">
                <Card.Title> {recipe.name} </Card.Title>

                <div className='mb-3'>
                    {renderCategoryRow()}
                    {renderHashTags()}
                    {renderRating(recipe, t('p.numberOfRatings'))}
                    <div className="description"> {getShorterText(recipe.description, 60)}</div>
                </div>

                <MyButton.Primary onClick={(e: any) => recipeCallback(recipe, e)} className="full-width">{t('p.goToRecipe')}</MyButton.Primary>
            </Card.Body>
        </Card >
    );

    function renderCategoryRow() {
        return (
            <Row>
                <Col>
                    {renderCategories(recipe)}
                </Col>
                {additionalFunctionElement && <Col md={3}>{additionalFunctionElement}</Col>}
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
}

export default forwardRef(RecipeCard);