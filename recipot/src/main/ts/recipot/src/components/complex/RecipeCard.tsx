
import { Button, Card, Stack } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import './styles.scss';
import HashTagBadge from '../basicUi/HashTagBadge';
import MyButton from '../basicUi/MyButton';
import { useTranslation } from 'react-i18next';

function RecipeCard({ recipe, recipeCallback }: any) {
    const { t } = useTranslation();
    const shortDesc = recipe.description.length > 60 ? recipe.description.substring(0, 60) + "..." : recipe.description;
    const getRating = () => {
        return (
            <div className="h6">
                <AiFillStar /> {recipe.averageRating}/5  &nbsp;
                <div className="vr"></div>
                &nbsp; Liczba ocen: {recipe.ratingsCount}
            </div>
        )
    }
    const getHashTags = () => {
        return (
            <Stack direction="horizontal">
                {
                    recipe.tags.slice(0, 2).map((category: any) => (
                        <HashTagBadge text={category} key={category} />)
                    )
                }
            </Stack>
        )
    }
    return (

        <Card className="recipe-card mb-2 me-2">
            <Card.Img variant="top" src={recipe.photo} />
            <Card.Body>
                <Card.Title> {recipe.name} </Card.Title>

                <div className='mb-3'>
                    <h6>{recipe.categories.slice(0, 1)}</h6>
                    {getHashTags()}
                    {getRating()}
                    {shortDesc}
                </div>

                <MyButton.Primary onClick={recipeCallback} className="full-button">{t('p.goToRecipe')}</MyButton.Primary>
            </Card.Body>
        </Card >
    );
}

export default RecipeCard;