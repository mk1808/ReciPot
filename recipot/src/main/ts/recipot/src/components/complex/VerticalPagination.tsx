import { getPageNumbers } from "../../utils/VerticalPaginationUtils";
import MyButton from "../basicUi/MyButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import './styles.scss';

function VerticalPagination({
    totalPages,
    actualPage,
    pageButtonsToShow,
    onPageSelect
}: {
    totalPages: number,
    actualPage: number,
    pageButtonsToShow: number,
    onPageSelect: (page: number) => void
}) {

    function getIsCurrentPage(pageNumber: number) {
        return pageNumber === actualPage;
    }

    return (
        <div className="vertical-pagination">
            <div className="pagination-container">
                {getPageNumbers(totalPages, actualPage, pageButtonsToShow,).map((pageNumber) => renderPageButton(pageNumber))}
            </div>
        </div>
    )

    function renderPageButton(pageNumber: number) {
        if (pageNumber < 0) {
            return <div className="empty-page-button" key={pageNumber}><BsThreeDotsVertical /></div>
        }
        return <MyButton.Primary key={pageNumber} className="page-button" disabled={getIsCurrentPage(pageNumber)} onClick={() => onPageSelect(pageNumber)}>{pageNumber + 1}</MyButton.Primary>
    }
}

export default VerticalPagination;