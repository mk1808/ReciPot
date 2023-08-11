import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { AiFillStar } from 'react-icons/ai';

function RecipeCardCircle({ recipe, recipeCallback }: any) {
    const shortDesc = recipe.description.length > 160 ? recipe.description.substring(0, 160) + "..." : recipe.description;
    const getRating = () => {
        return (
            <div className="h6">
                <AiFillStar /> {recipe.averageRating}/5  &nbsp;
                <div className="vr"></div>
                &nbsp; Liczba ocen: {recipe.ratingsCount}
            </div>
        )
    }

    return (
        <div className='circle-card-container'>
            <div className="circle-container">
                <Card className='p-3'>
                    <Card.Title className="big-title pb-3 mb-3"> {recipe.name} </Card.Title>
                    <Card.Body className="body">
                        <h6>{recipe.categories.slice(0, 1)}</h6>
                        {getRating()}
                        {shortDesc}
                    </Card.Body>
                </Card>
                <Image className="img" src={recipe.photo} roundedCircle onClick={recipeCallback} />
            </div>
        </div>
    );
}

export default RecipeCardCircle;