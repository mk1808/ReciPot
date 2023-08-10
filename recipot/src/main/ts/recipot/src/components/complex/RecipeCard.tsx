
import { Button, Card, Stack } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import './styles.scss';
import { Recipe } from '../../data/types';
import HashTagBadge from '../basicUi/HashTagBadge';

function RecipeCard({ recipe, recipeCallback }: any) {
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
                <Card.Text>
                    <h6>{recipe.categories.slice(0, 1)}</h6>
                    {getHashTags()}
                    {getRating()}
                    {shortDesc}
                </Card.Text>
                <Button variant="primary" className="full-button" onClick={recipeCallback}>Go somewhere</Button>
            </Card.Body>
        </Card >
    );
}

//kategoria, hasztagi, ocena, liczba ocen
export default RecipeCard;