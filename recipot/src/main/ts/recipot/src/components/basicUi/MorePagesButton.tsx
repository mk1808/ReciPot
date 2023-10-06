import { FaArrowDown } from "react-icons/fa6";
import MyButton from "./MyButton";

function MorePagesButton({ text, loadNextPage }: { text: string, loadNextPage: any }) {
    return (
        <MyButton.OutlinePrimary onClick={loadNextPage} className="round-button my-5">
            <div className="mb-3">{text}</div>
            <FaArrowDown />
        </MyButton.OutlinePrimary>
    )
}

export default MorePagesButton;