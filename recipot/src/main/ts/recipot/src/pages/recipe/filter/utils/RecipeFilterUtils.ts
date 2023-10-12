import { CategoryDto } from "../../../../data/types"
import { SelectOption } from "../../../../data/utilTypes"
import { mapCategoriesToSearchList } from "../../../../utils/DictionariesUtils"
import { scrollIntoRecipesPage } from "../../../../utils/RecipeSearchUtils"
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
        return false;
    }
    for (let category of recipesFilterForm.categories) {
        const previousCategory = matchedCategories.filter(mCategory => mCategory.value.id === category.value.id);
        if (previousCategory.length !== 0 && previousCategory[0].children?.length !== category.children?.length) {
            return true
        }
    }
    return false;
}