import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { renderRating } from './RecipeCardCommonElements';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../data/types';
import { getShorterText } from '../../utils/TextUtils';

function RecipeCardCircle({ recipe, recipeCallback }: {recipe:Recipe, recipeCallback:(recipe:Recipe)=>void}) {
    const { t } = useTranslation();

    return (
        <div className='circle-card-container'>
            <div className="circle-container">
                <Card className='p-3'>
                    <Card.Title className="big-title pb-3 mb-3"> {recipe.name} </Card.Title>
                    <Card.Body className="body">
                        <h6>{recipe.categories.map(category => category.name).slice(0, 1)}</h6>
                        {renderRating(recipe, t('p.numberOfRatings'))}
                        {getShorterText(recipe.description, 60)}
                    </Card.Body>
                </Card>
                <Image className="img" src={recipe.image} roundedCircle onClick={()=>recipeCallback(recipe)} />
            </div>
        </div>
    );
}

export default RecipeCardCircle;