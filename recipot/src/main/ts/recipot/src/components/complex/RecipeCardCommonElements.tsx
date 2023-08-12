import { AiFillStar } from 'react-icons/ai';
import { Recipe } from '../../data/types';

export function renderRating(recipe:Recipe, text:string) {
    return (
        <div className="h6">
            <AiFillStar /> {recipe.averageRating}/5  &nbsp;
            <div className="vr"></div>
            &nbsp; {text}: {recipe.ratingsCount}
        </div>
    )
};
