import dictionariesApi from "../api/DictionariesApi";
import { CategoryDto, RecipeAccessType, RecipeAmountOfDishes, RecipeDifficulty, RecipeRequiredEffort } from "../data/types";
import { Enums } from "../data/utilTypes";

export function getAccessTypes(t: any, values: RecipeAccessType[]): { label: string, value: RecipeAccessType }[] {
    return dictionaryValueToSelectOption('RecipeAccessType', values, t);
}

export function getAmountOfDishes(t: any, values: RecipeAmountOfDishes[]): { label: string, value: RecipeAmountOfDishes }[] {
    return dictionaryValueToSelectOption('RecipeAmountOfDishes', values, t);
}

export function getDifficulties(t: any, values: RecipeDifficulty[]): { label: string, value: RecipeDifficulty }[] {
    return dictionaryValueToSelectOption('RecipeDifficulty', values, t);
}

export function getRequiredEfforts(t: any, values: RecipeRequiredEffort[]): { label: string, value: RecipeRequiredEffort }[] {
    return dictionaryValueToSelectOption('RecipeRequiredEffort', values, t);
}

function dictionaryValueToSelectOption<T>(enumType: string, values: T[], t: any): { label: string, value: T }[] {
    return values.map((value) => { return { label: t(`enums.${enumType}.${value}`), value } });
}

export function onFilteredHashTagSearch(phrase: string, callback: any) {
    dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { callback(mapDictionaryValueToSearchList(response.value.content)) })
}

export function onFilteredIngredientSearch(phrase: string, callback: any) {
    dictionariesApi.getAllIngredients({ name: phrase, size: 5 }, (response: any) => { callback(mapDictionaryValueToSearchList(response.value.content)) })
}

export function mapDictionaryValueToSearchList(values: any[]) {
    return values.map(value => { return { value, label: value.name } })
}

export function mapCategoriesToSearchList(categories: CategoryDto[]): any[] {
    return categories.map(category => { return { value: category, label: category.name, children: mapCategoriesToSearchList(category.children) } })
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