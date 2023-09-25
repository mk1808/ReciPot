
import { Card, Stack } from 'react-bootstrap';
import {forwardRef } from "react";
import './styles.scss';
import HashTagBadge from '../basicUi/HashTagBadge';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { initFcn } from '../../utils/ObjectUtils';
import { renderRating } from './RecipeCardCommonElements';
import { getShorterText } from '../../utils/TextUtils';
import HashTagList from '../basicUi/HashTagList';

function RecipeCard({ recipe, recipeCallback = initFcn<Recipe>(), className }: { recipe: Recipe, recipeCallback: Function, className?: string }, ref:any) {
    const { t } = useTranslation();
    const defaultImage = 'https://violashop.in/wp-content/uploads/2021/07/Viola-Candescent-Cutlery-Set-3.jpg'

    return (
        <Card className={`recipe-card mb-2 ${(className || "me-2")}`} ref={ref}>
            <Card.Img variant="top" src={recipe.image ?? defaultImage} height={180} />
            <Card.Body className="body">
                <Card.Title> {recipe.name} </Card.Title>

                <div className='mb-3'>
                    <h6>{recipe.categories.map(category => category.name)[0]}</h6>
                    {renderHashTags()}
                    {renderRating(recipe, t('p.numberOfRatings'))}
                    <div className="description"> {getShorterText(recipe.description, 60)}</div>
                </div>

                <MyButton.Primary onClick={(e: any) => recipeCallback(recipe, e)} className="full-width">{t('p.goToRecipe')}</MyButton.Primary>
            </Card.Body>
        </Card >
    );

    function renderHashTags() {
        return <HashTagList hashTags={recipe.hashTags.slice(0, 2)} />
    };
}

export default forwardRef(RecipeCard);