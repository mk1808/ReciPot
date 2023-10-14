export function roundToHalf(num: number) {
    return Math.round(num * 2) / 2;
}

export function getRand() {
    return Math.random() * 1000;
}

export function getNumberOfElements(containerHeight: number, categoriesHeight: number, recipeCardHeight: number) {
    let recipesContainerHeight = containerHeight - categoriesHeight;
    return Math.floor(recipesContainerHeight / recipeCardHeight);
}