import { FaArrowDown } from "react-icons/fa6";

import MyButton from "./MyButton";

type Params = {
    text: string,
    onLoadNextPage: () => any
};

function MorePagesButton({
    text,
    onLoadNextPage
}: Params) {

    return (
        <MyButton.OutlinePrimary onClick={onLoadNextPage} className="round-button my-5">
            <div className="mb-3"> {text} </div>
            <FaArrowDown />
        </MyButton.OutlinePrimary>
    );
}

export default MorePagesButton;