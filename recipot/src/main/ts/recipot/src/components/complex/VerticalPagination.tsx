import { useMemo } from 'react';
import { getPageNumbers } from "../../utils/VerticalPaginationUtils";
import MyButton from "../basicUi/MyButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import './styles.scss';

type Props = {
    totalPages: number,
    actualPage: number,
    pageButtonsToShow: number,
    onPageSelect: (page: number) => void
};

function VerticalPagination({
    totalPages,
    actualPage,
    pageButtonsToShow,
    onPageSelect
}: Props) {

    const pageNumbers = useMemo(() => {
        return getPageNumbers(totalPages, actualPage, pageButtonsToShow)
    }, [totalPages, actualPage])

    function getIsCurrentPage(pageNumber: number) {
        return pageNumber === actualPage;
    }

    return (
        <div className="vertical-pagination">
            <div className="pagination-container">
                {renderPageButtons()}
            </div>
        </div>
    )

    function renderPageButtons() {
        return pageNumbers.map((pageNumber) => renderPageButton(pageNumber))
    }

    function renderPageButton(pageNumber: number) {
        if (pageNumber < 0) {
            return <div className="empty-page-button" key={pageNumber}><FaEllipsisVertical /></div>
        }
        return (
            <MyButton.Primary
                key={pageNumber}
                className="page-button"
                disabled={getIsCurrentPage(pageNumber)}
                onClick={() => onPageSelect(pageNumber)}
            >
                {pageNumber + 1}
            </MyButton.Primary>
        )
    }
}

export default VerticalPagination;