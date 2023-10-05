import { BsStarFill } from 'react-icons/bs';
import { Recipe } from '../../data/types';

export function renderRating(recipe: Recipe, text: string) {
    return (
        <div className="h6">
            <BsStarFill className='mb-1' /> {recipe.averageRating}/5  &nbsp;
            <div className="vr"></div>
            &nbsp; {text}: {recipe.ratingsCount}
        </div>
    )
};
