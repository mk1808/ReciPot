import { forwardRef } from "react";
import { Card, Col, Row, Stack } from 'react-bootstrap';
import './styles.scss';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { initFcn } from '../../utils/ObjectUtils';
import { renderRating } from './RecipeCardCommonElements';
import { getShorterText } from '../../utils/TextUtils';
import HashTagList from '../basicUi/HashTagList';
import { onImageLoadError } from "../../utils/RestUtils";
import { useNavigate } from "react-router-dom";
import { goToFilters } from "../../utils/NavigationUtils";
import Tooltip from "../basicUi/Tooltip";

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
    const navigate = useNavigate();

    function onHashTagClick(hashTag: any) {
        goToFilters({ hashTags: [{ label: hashTag.name, value: hashTag }] }, navigate);
    }

    function getMoreNumber(list?: any[]) {
        const listLength = list?.length || 1;
        return listLength - 1;
    }

    function getMoreList(list?: any[]) {
        if (list?.length && list.length > 0) {
            return list.slice(1, list.length).map(element => element.name).join(", ");
        }
        return "";
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
                    <Stack direction="horizontal">
                        <h6>
                            {recipe.categories.map(category => category.name)[0]}
                        </h6>
                        {renderMore(recipe.categories)}
                    </Stack>
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

    function renderMore(list?: any[]) {
        const elementsNumber = getMoreNumber(list);
        return elementsNumber > 0 && (
            <Tooltip placement={"bottom"} title={getMoreList(list)}>
                <h6 className="ms-2 cursor-pointer">{`(+${elementsNumber})`}</h6>
            </Tooltip>
        );
    };
}

export default forwardRef(RecipeCard);