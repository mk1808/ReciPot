import { initFcn } from "../../utils/ObjectUtils";
import MyButton from "../basicUi/MyButton";
import { BsThreeDotsVertical } from "react-icons/bs";

function VerticalPagination({ totalPages = 1, actualPage = 0, pageButtonsToShow = 10, onPageSelect = initFcn<number>() }: any) {

    function getPageNumbers(): number[] {
        const pageNumbers = [0]
        const addEmptyButton = totalPages > pageButtonsToShow + 2;
        if (addEmptyButton) {
            pageNumbers.push(-2)
        }
        const halfOfPagesToShow = Math.floor(pageButtonsToShow / 2)
        for (let pageNumber = actualPage - halfOfPagesToShow; pageNumber < actualPage + halfOfPagesToShow + 1; pageNumber++) {
            pageNumbers.push(pageNumber)
        }
        if (addEmptyButton) {
            pageNumbers.push(-1)
        }
        pageNumbers.push(totalPages - 1)

        return pageNumbers;
    }

    function getIsCurrentPage(pageNumber: number) {
        return pageNumber === actualPage;
    }

    return <div className="vertical-pagination">
        <div className="pagination-container">
            {getPageNumbers().map((pageNumber) => renderPageButton(pageNumber))}
        </div>
    </div>

    function renderPageButton(pageNumber: number) {
        if (pageNumber < 0) {
            return <div className="empty-page-button" key={pageNumber}><BsThreeDotsVertical /></div>
        }
        return <MyButton.Primary key={pageNumber} className="page-button" disabled={getIsCurrentPage(pageNumber)} onClick={() => onPageSelect(pageNumber)}>{pageNumber + 1}</MyButton.Primary>
    }
}

export default VerticalPagination;