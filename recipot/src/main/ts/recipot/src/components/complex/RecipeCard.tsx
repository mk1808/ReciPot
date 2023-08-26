
import { Card, Stack } from 'react-bootstrap';
import './styles.scss';
import HashTagBadge from '../basicUi/HashTagBadge';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { initFcn } from '../../utils/ObjectUtils';
import { renderRating } from './RecipeCardCommonElements';
import { getShorterText } from '../../utils/TextUtils';

function RecipeCard({ recipe, recipeCallback = initFcn<Recipe>() }: { recipe: Recipe, recipeCallback: Function }) {
    const { t } = useTranslation();

    return (
        <Card className="recipe-card mb-2 me-2">
            <Card.Img variant="top" src={recipe.image} />
            <Card.Body>
                <Card.Title> {recipe.name} </Card.Title>

                <div className='mb-3'>
                    <h6>{recipe.categories.map(category => category.name)[0]}</h6>
                    {renderHashTags()}
                    {renderRating(recipe, t('p.numberOfRatings'))}
                    {getShorterText(recipe.description, 60)}
                </div>

                <MyButton.Primary onClick={recipeCallback} className="full-width">{t('p.goToRecipe')}</MyButton.Primary>
            </Card.Body>
        </Card >
    );

    function renderHashTags() {
        return (
            <Stack direction="horizontal">
                {
                    recipe.hashTags.slice(0, 2).map((tag: any) => (
                        <HashTagBadge text={tag.name} key={tag.id} />)
                    )
                }
            </Stack>
        )
    };
}

export default RecipeCard;