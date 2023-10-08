import { FaArrowDown } from "react-icons/fa6";
import MyButton from "./MyButton";

type Params = {
    text: string,
    loadNextPage: any
};

function MorePagesButton({
    text,
    loadNextPage
}: Params) {

    return (
        <MyButton.OutlinePrimary onClick={loadNextPage} className="round-button my-5">
            <div className="mb-3">{text}</div>
            <FaArrowDown />
        </MyButton.OutlinePrimary>
    )
}

export default MorePagesButton;