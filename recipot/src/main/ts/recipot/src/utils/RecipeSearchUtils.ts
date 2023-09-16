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
        dataOption: "all",
        searchOrder: recipesFilterForm.recipesSort
    } as RecipeSearchDto
}

export function updatePageUrl(recipesFilterForm?: any) {
    const url = new URL(window.location as any);

    for (const filter in recipesFilterForm) {
        const value = recipesFilterForm[filter];
        if (typeof value === 'object') {
            if (typeof value.children !== 'undefined') {
                value.children = null;
            }
            if (typeof value.value !== 'undefined') {
                value.value.name = null;
                value.value.children = null;
                value.value.image = null;
            }
            url.searchParams.set(filter, JSON.stringify(value));
        } else {
            url.searchParams.set(filter, value);
        }
    }

    window.history.pushState({}, "", url);
}

function getFilterSearchCriteria(filterKey: string, filterValue: any): SearchCriteriaDto | null {
    switch (filterKey) {
        case "userIsOwner": return filter("user", "eq", () => filterValue);
        case "accessType": return filter("accessType", "eq", () => filterValue);
        case "recipeName": return filter("name", "cn", () => filterValue);
        case "timeAmountFrom": return filter("timeAmount", "ge", () => filterValue);
        case "timeAmountTo": return filter("timeAmount", "le", () => filterValue);
        case "amountOfDishes": return filter("numberOfDishes", "eq", () => filterValue);
        case "difficulties": return filter("difficulty", "eq", () => filterValue);
        case "requiredEffort": return filter("requiredEffort", "eq", () => filterValue);
        case "averageRating": return filter("averageRating", "ge", () => filterValue);
        case "hashTags": return filter("hashTags", "in", () => getValueIdsFromArray(filterValue));
        case "ingredients": return filter("ingredients", "in", () => getValueIdsFromArray(filterValue));
        case "categories": return filter("categories", "in", () => getValueIdsFromArray(filterValue));
        default: return null;
    }
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