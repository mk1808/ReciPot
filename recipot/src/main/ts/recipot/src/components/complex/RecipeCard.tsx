
import { Button, Card, Stack } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import './styles.scss';
import { Recipe } from '../../data/types';
import HashTagBadge from '../basicUi/HashTagBadge';

function RecipeCard({ recipe }: any) {
    console.log(recipe)
    const shortDesc = recipe.description.length > 60 ? recipe.description.substring(0, 60) + "..." : recipe.description;
    const photo = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189cc491e6b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189cc491e6b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={recipe.photo} />
            <Card.Body>
                <Card.Title> {recipe.name} </Card.Title>
                <Card.Text>
                    
                    <h6>{recipe.categories.slice(0, 1)}</h6>
                    <h6><AiFillStar /> {recipe.averageRating}/5  &nbsp;
                        <div className="vr"></div>
                        &nbsp; Liczba ocen: {recipe.ratingsCount} </h6>
                        <Stack direction="horizontal">
                        {
                            recipe.tags.slice(0, 2).map((category: any) => (
                                <HashTagBadge text={category} />)
                            )
                        }
                    </Stack>
                    {shortDesc}
                </Card.Text>
                <Button variant="primary" className="full-button">Go somewhere</Button>
            </Card.Body>
        </Card >
    );
}
//kategoria, hasztagi, ocena, liczba ocen
export default RecipeCard;