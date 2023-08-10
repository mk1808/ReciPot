import { Card, Stack } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import HashTagBadge from '../basicUi/HashTagBadge';
import { AiFillStar } from 'react-icons/ai';

function RecipeCardCircle({ recipe, recipeCallback }: any) {
    const shortDesc = recipe.description.length > 160 ? recipe.description.substring(0, 160) + "..." : recipe.description;
    const photo = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189d8cc414e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189d8cc414e%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2259.921875%22%20y%3D%2294.5%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
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
        <div className='circle-box-container'>
            <div className="container circle-box-container2">
                <Card className='box p-3'>
                    <Card.Title className="big-title pb-3 mb-3"> {recipe.name} </Card.Title>
                    {/*  <Card.Text>
                    
                </Card.Text>*/}
                    <Card.Body className="cbody">
                        <h6>{recipe.categories.slice(0, 1)}</h6>
                        {/*getHashTags()*/}
                        {getRating()}
                        {shortDesc}

                    </Card.Body>

                </Card>

                <Image className="img" src={photo} roundedCircle onClick={recipeCallback} />
            </div>
        </div>
    );
}

export default RecipeCardCircle;