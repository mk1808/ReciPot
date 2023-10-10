import { Card } from 'react-bootstrap';
import { renderCategories, renderRating } from './RecipeCardCommonElements';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { getShorterText } from '../../utils/TextUtils';
import MyImage from '../basicUi/MyImage';

type Props = {
    recipe: Recipe,
    onGoToRecipe: (recipe: Recipe) => void
};

function RecipeCardCircle({
    recipe,
    onGoToRecipe
}: Props) {

    const { t } = useTranslation();

    return (
        <div className='circle-card-container'>
            <div className="circle-container">
                {renderCard()}
                {renderImage()}
            </div>
        </div>
    );

    function renderCard() {
        return (
            <Card className='p-3'>
                <Card.Title className="big-title pb-3 mb-3"> {recipe.name} </Card.Title>
                <Card.Body className="body">
                    <h6>{renderCategories(recipe)}</h6>
                    {renderRating(recipe, t('p.numberOfRatings'))}
                    {getShorterText(recipe.description, 85)}
                </Card.Body>
            </Card>
        );
    }

    function renderImage() {
        return <MyImage
            className="img"
            src={recipe.image}
            roundedCircle
            onClick={() => onGoToRecipe(recipe)}
        />
    }
}

export default RecipeCardCircle;