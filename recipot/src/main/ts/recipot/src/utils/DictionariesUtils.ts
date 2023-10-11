import dictionariesApi from "../api/DictionariesApi";
import { CategoryDto, RecipeAccessType, RecipeAmountOfDishes, RecipeDifficulty, RecipeRequiredEffort } from "../data/types";
import { Enums, SelectOption } from "../data/utilTypes";

export function getAccessTypes(t: any, values: RecipeAccessType[]): SelectOption<RecipeAccessType>[] {
    return dictionaryValueToSelectOption('RecipeAccessType', values, t);
}

export function getAmountOfDishes(t: any, values: RecipeAmountOfDishes[]): SelectOption<RecipeAmountOfDishes>[] {
    return dictionaryValueToSelectOption('RecipeAmountOfDishes', values, t);
}

export function getDifficulties(t: any, values: RecipeDifficulty[]): SelectOption<RecipeDifficulty>[] {
    return dictionaryValueToSelectOption('RecipeDifficulty', values, t);
}

export function getRequiredEfforts(t: any, values: RecipeRequiredEffort[]): SelectOption<RecipeRequiredEffort>[] {
    return dictionaryValueToSelectOption('RecipeRequiredEffort', values, t);
}

function dictionaryValueToSelectOption<T>(enumType: string, values: T[], t: any): SelectOption<T>[] {
    return values.map((value) => ({ label: t(`enums.${enumType}.${value}`), value } as SelectOption<T>));
}

export function onFilteredHashTagSearch(phrase: string, callback: any) {
    dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { callback(mapDictionaryValueToSearchList(response.value.content)) });
}

export function onFilteredIngredientSearch(phrase: string, callback: any) {
    dictionariesApi.getAllIngredients({ name: phrase, size: 5 }, (response: any) => { callback(mapDictionaryValueToSearchList(response.value.content)) });
}

export function mapDictionaryValueToSearchList(values: any[]) {
    return values.map(value => ({ value, label: value.name }));
}

export function mapCategoriesToSearchList(categories: CategoryDto[]): any[] {
    return categories.map(category => (
        {
            value: category,
            label: category.name,
            children: mapCategoriesToSearchList(category.children)
        }));
}


export function searchCategory(categories: CategoryDto[], phrase: string): any[] {
    const result: any[] = [];
    categories.forEach(category => {
        if (checkCategoryContainsPhrase(category, phrase)) {
            result.push(category)
        } else if (category.children.length > 0) {
            const foundChildren = searchCategory(category.children, phrase)
            if (foundChildren.length > 0) {
                const tempCategory = { ...category }
                tempCategory.children = foundChildren
                result.push(tempCategory)
            }
        }
    })
    return result;
}

export function getConverters(): Enums {
    return {
        difficulties: getDifficulties,
        requiredEfforts: getRequiredEfforts,
        amountsOfDishes: getAmountOfDishes,
        accessTypes: getAccessTypes
    }
}

function checkCategoryContainsPhrase(category: CategoryDto, phrase: string) {
    return category.name.indexOf(phrase) >= 0;
}