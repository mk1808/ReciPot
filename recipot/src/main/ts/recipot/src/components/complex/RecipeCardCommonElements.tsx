import { BsStarFill } from 'react-icons/bs';
import { Recipe } from '../../data/types';
import Tooltip from '../basicUi/Tooltip';
import { Stack } from 'react-bootstrap';

export function renderRating(recipe: Recipe, text: string) {
    return (
        <div className="h6 rating">
            <BsStarFill className='mb-1' /> {recipe.averageRating}/5  &nbsp;
            <div className="vr"/>
            &nbsp; {text}: {recipe.ratingsCount}
        </div>
    )
};

export function renderMore(list?: any[]) {

    function getMoreNumber(list?: any[]) {
        const listLength = list?.length || 1;
        return listLength - 1;
    }

    function getMoreList(list?: any[]) {
        if (list?.length && list.length > 0) {
            return list.slice(1, list.length).map(element => element.name).join(", ");
        }
        return "";
    }
    const elementsNumber = getMoreNumber(list);
    return elementsNumber > 0 && (
        <Tooltip title={getMoreList(list)}>
            <h6 className="ms-2 cursor-pointer">{`(+${elementsNumber})`}</h6>
        </Tooltip>
    );
};

export function renderCategories(recipe: Recipe) {
    return (
        <Stack direction="horizontal">
            <h6>
                {recipe.categories.map(category => category.name)[0]}
            </h6>
            {renderMore(recipe.categories)}
        </Stack>
    )
}
