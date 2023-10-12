import { CategoryDto, RecipeSearchDto, SearchCriteriaDto } from "../../../../data/types";
import { SelectOption } from "../../../../data/utilTypes"
import { mapCategoriesToSearchList } from "../../../../utils/DictionariesUtils"
import { ReducerActionProps, contextStateModel } from "../context/RecipeFilterContext"

export function getSelectedFilterFormValue(contextState: contextStateModel, activeRecipeFilterId: string) {
    if (contextState.savedFilters) {
        const filter = contextState.savedFilters.filter(filter => filter.id === activeRecipeFilterId)[0];
        if (filter) {
            return JSON.parse(filter.value);
        }
    }
    return contextState.recipesFilterForm;
}

export function focusOnRecipesPage(page?: number) {
    setTimeout(() => {
        scrollIntoRecipesPage(page || 0);
    }, 400)
}

export function parseParamsToFilterValues() {
    const queryParams: any = new URLSearchParams(window.location.search);
    const result = [];
    for (const [fieldName, value] of queryParams) {
        let parsedValue = value;
        try {
            parsedValue = JSON.parse(value);
        } catch (e) { }

        result.push({
            fieldName,
            value: parsedValue
        });
    }
    return result;
}

export function getRecipePages(contextState: contextStateModel, action: ReducerActionProps) {
    const recipesPages = [...(contextState?.recipesPages || [])];
    recipesPages[action.recipesPage.number] = action.recipesPage.content;
    return recipesPages;
}

export function getRecipesSortOptions(t: any) {
    const sortByFields = ["name", "ratingsCount", "averageRating", "created"];
    const orders = ["ASC", "DESC"];

    const options: SelectOption<any>[] = [];

    sortByFields.forEach(fieldName => {
        orders.forEach(order => {
            options.push({ label: t(`enums.RecipesSort.${fieldName}${order}`), value: { fieldName, order } })
        })
    })

    return options;
}

export function getAverageRating(t: any): SelectOption<number>[] {
    const results = [];
    for (let i = 1; i <= 5; i++) {
        results.push({ label: String(i) + " " + t("p.andMore"), value: i });
    }
    return results;
}

export function matchCategories(categories: SelectOption<CategoryDto>[], allCategories: CategoryDto[]): SelectOption<CategoryDto>[] {
    return categories.map(category => {
        if (!!category.children) {
            return category;
        }
        const optionCategory = allCategories.filter(optionCategory => optionCategory.id === category.value.id);
        return optionCategory.length > 0 ? mapCategoriesToSearchList(optionCategory)[0] : category;
    })
}

export function areCategoriesDifferent(recipesFilterForm: any, matchedCategories: SelectOption<CategoryDto>[]) {
    if (!recipesFilterForm || matchedCategories.length !== recipesFilterForm.categories?.length) {
        return true;
    }
    for (let category of recipesFilterForm.categories) {
        const previousCategory = matchedCategories.filter(mCategory => mCategory.value.id === category.value.id);
        if (previousCategory.length !== 0 && previousCategory[0].children?.length !== category.children?.length) {
            return true
        }
    }
    return false;
}
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
    } as RecipeSearchDto;
}

export function updatePageUrl(recipesFilterForm?: any) {
    window.history.pushState({}, "", createUrl(recipesFilterForm));
}

export function createUrl(recipesFilterForm?: any) {
    const url = new URL(window.location as any);
    for (const filter in recipesFilterForm) {
        const value = createUrlParam(recipesFilterForm[filter]);
        if (typeof value != 'undefined') {
            url.searchParams.set(filter, value);
        }
    }
    return url;
}

function createUrlParam(filter: any) {
    if (typeof filter === 'undefined') {
        return;
    } else if (typeof filter === 'object') {
        if (typeof filter.children !== 'undefined') {
            filter.children = null;
        }
        if (typeof filter.value !== 'undefined') {
            filter.value.name = null;
            filter.value.children = null;
            filter.value.image = null;
        }
        return JSON.stringify(filter);
    } else {
        return filter;
    }
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
        case "categories": return filter("categories", "in", () => getValueForCategory(filterValue));
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
        result.push(element.id || element.value.id)
    });
    return result.length > 0 ? result : null;
}

function getValueForCategory(categories: CategoryDto[]): any[] | null {
    const mainCategoriesIds = getValueIdsFromArray(categories) || [];
    const childrenCategoriesIds = categories.flatMap(category => getValueForCategory(category.children || []));
    const allCategories = [...mainCategoriesIds, ...childrenCategoriesIds].filter(id => !!id);
    return allCategories.length > 0 ? allCategories : null;
}

export function scrollIntoRecipesPage(page: number) {
    const pageId = "recipesPage_" + page;
    document.getElementById(pageId)?.scrollIntoView();
}