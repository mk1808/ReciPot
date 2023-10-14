import { Stack } from 'react-bootstrap';
import './../styles.scss';
import { FaUser } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { formatNoTime } from "../../../../utils/DateUtils";
import Rating from './Rating';
import { Recipe } from '../../../../data/types';

type Props = {
    recipe: Recipe
};

function AuthorAndDate({
    recipe
}: Props) {
    return (
        <Stack direction="horizontal" className="flex-wrap my-3 px-5 author-date">
            {renderInfo()}
        </Stack>
    );

    function renderInfo() {
        return (
            <>
                <div className="me-5 owner-login">
                    <strong><FaUser /></strong>
                    {recipe.owner.login}
                </div>
                <div className="recipe-creation-time">
                    <strong><FaRegCalendarDays /></strong>
                    {formatNoTime(recipe.created)}
                </div>
                <div className="rating-section ms-auto">
                    <Rating recipe={recipe} className="position" />
                </div>
            </>
        )
    }
}

export default AuthorAndDate;