export function getPageNumbers(totalPages: number, actualPage: number, pageButtonsToShow: number): number[] {
    const pageNumbers = [];

    const halfOfPagesToShow = Math.floor(pageButtonsToShow / 2);
    const startPage = getStartPage(actualPage, halfOfPagesToShow);
    const endPage = getEndPage(actualPage, halfOfPagesToShow, totalPages);

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
        pageNumbers.push(pageNumber)
    }

    addPageZero(pageNumbers);
    addLastPage(pageNumbers, totalPages)

    return pageNumbers;
}

function getStartPage(actualPage: number, halfOfPagesToShow: number) {
    let startPage = actualPage - halfOfPagesToShow;
    return startPage < 0 ? 0 : startPage;
}

function getEndPage(actualPage: number, halfOfPagesToShow: number, totalPages: number) {
    let endPage = actualPage + halfOfPagesToShow;
    return endPage > totalPages - 1 ? totalPages - 1 : endPage;
}

function addPageZero(pageNumbers: number[]) {
    const firstPage = pageNumbers[0];
    if (firstPage > 1) {
        const impossiblePageNumber = -1;
        pageNumbers.unshift(impossiblePageNumber);
    }
    if (firstPage !== 0) {
        pageNumbers.unshift(0);
    }
}

function addLastPage(pageNumbers: number[], totalPages: number) {
    const currentLastPage = pageNumbers[pageNumbers.length - 1];
    if (currentLastPage < totalPages - 2) {
        const impossiblePageNumber = -2;
        pageNumbers.push(impossiblePageNumber);
    }
    if (totalPages !== 0 && currentLastPage !== totalPages - 1) {
        pageNumbers.push(totalPages - 1);
    }
}

