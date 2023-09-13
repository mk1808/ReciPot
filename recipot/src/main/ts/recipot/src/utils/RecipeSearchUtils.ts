import { RecipeSearchDto, SearchCriteriaDto } from "../data/types";

export function buildRecipeSearchDto(recipesFilterForm?: any): RecipeSearchDto {
    const searchCriteriaList: SearchCriteriaDto[] = [];

    for (const filter in recipesFilterForm) {
        const filterCriteria = getFilterSearchCriteria(filter, recipesFilterForm[filter]);
        if (filterCriteria && filterCriteria.value) {
            searchCriteriaList.push(filterCriteria)
        }
    }

    return {
        searchCriteriaList: searchCriteriaList,
        dataOption: "all"
    } as RecipeSearchDto
}

function getFilterSearchCriteria(filterKey: string, filterValue: any): SearchCriteriaDto {
    const filterOperationsMap = {
        userIsOwner: () => filter("user", "eq", () => filterValue),
        accessType: () => filter("accessType", "eq", () => filterValue),
        recipeName: () => filter("name", "cn", () => filterValue),
        timeAmountFrom: () => filter("timeAmount", "ge", () => filterValue),
        timeAmountTo: () => filter("timeAmount", "le", () => filterValue),
        amountOfDishes: () => filter("numberOfDishes", "eq", () => filterValue),
        difficulties: () => filter("difficulty", "eq", () => filterValue),
        requiredEffort: () => filter("requiredEffort", "eq", () => filterValue),
        averageRating: () => filter("averageRating", "ge", () => filterValue),
        hashTags: () => filter("hashTags", "in", () => getValueIdsFromArray(filterValue)),
        ingredients: () => filter("ingredients", "in", () => getValueIdsFromArray(filterValue)),
        categories: () => filter("categories", "in", () => getValueIdsFromArray(filterValue)),
    }
    return filterOperationsMap[filterKey as keyof typeof filterOperationsMap]();
}

function filter(filterKey: string, operation: string, getValue: any): SearchCriteriaDto {
    return {
        filterKey,
        operation,
        value: getValue(),
        dataOption: ""
    }
}

function getValueIdsFromArray(filterValue: any) {
    const result: any[] = [];
    filterValue && filterValue.forEach((element: any) => {
        result.push(element.value.id)
    });
    return result.length > 0 ? result : null;
}