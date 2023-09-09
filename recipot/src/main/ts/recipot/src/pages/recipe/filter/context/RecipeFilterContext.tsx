import { createContext, useEffect, Context, useReducer } from "react";
import { Recipe, RecipeFilter } from "../../../../data/types";
import { initAs } from "../../../../utils/ObjectUtils";

type contextStateModel = {
    savedFilters?: RecipeFilter[],
    recipesPages?: Recipe[][],
    activeRecipeFilterId?: string,
    currentPage?: { totalPages: number, number: number },
    recipesFilterForm?: any
};

export const tempSavedRecipesList: RecipeFilter[] = [
    initAs<RecipeFilter>({
        id: "-1",
        name: "saved recipe filter 1",
        value: "{}"
    })
];

export const RecipeFilterContext: Context<contextStateModel> = createContext({});

export const RecipeFilterDispatchContext = createContext<Function>(() => { });

export const RecipeFilterContextContextProvider = ({ children }: any) => {
    const [contextState, dispatch]: [contextStateModel, Function] = useReducer(recipeFilterReducer, {});

    function getTempSavedFilters() {
        return tempSavedRecipesList;
    }

    function getTempRecipesPage() {
        const recipe: any = {
            id: "osidj-oeifj-9239",
            name: "Sałatka warzywna",
            averageRating: 4.5,
            ratingsCount: 110,
            categories: [{ id: "1", name: "Obiady", image: "" }, { id: "2", name: "Zupy", image: "" }],
            hashTags: [{ id: "1", name: "Obiady" }, { id: "2", name: "Zupy" }, { id: "3", name: "Zdrowe" }],
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189cc491e6b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189cc491e6b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        }
        const recipePage = [];
        for (let i = 0; i < 12; i++) {
            recipePage.push({ ...recipe, id: i })
        }
        return [recipePage, recipePage, recipePage];
    }

    function getTempCurrentPage(page: number) {
        return {
            totalPages: 3,
            number: page
        }
    }

    function getSelectedFilterFormValue(contextState: contextStateModel, activeRecipeFilterId: string) {
        const filterId = contextState.savedFilters?.map(filter => filter.id).indexOf(activeRecipeFilterId) || -1
        if (filterId >= 0) {
            return JSON.parse(contextState.savedFilters ? contextState.savedFilters[filterId].value : "")
        }
        return contextState.recipesFilterForm
    }

    function recipeFilterReducer(contextState: contextStateModel, action: any): contextStateModel {
        switch (action.type) {
            case 'filterSelect': {
                //TODO: POST recipes search with saved filter value
                return {
                    ...contextState,
                    activeRecipeFilterId: action.activeRecipeFilterId,
                    recipesPages: getTempRecipesPage(),
                    currentPage: getTempCurrentPage(0),
                    recipesFilterForm: getSelectedFilterFormValue(contextState, action.activeRecipeFilterId)
                };
            }
            case 'refreshFiltersList': {
                //TODO: GET saved filters 

                return {
                    ...contextState,
                    savedFilters: getTempSavedFilters()
                };
            }
            case 'savedRecipeFilter': {
                //TODO: POST saved filter
                return contextState;
            }
            case 'deleteRecipeFilter': {
                //TODO: DELETE saved recipe filter
                return contextState;
            }
            case 'filter': {
                //TODO: POST recipes search + new filter form value + page = 0
                return {
                    ...contextState,
                    recipesPages: getTempRecipesPage(),
                    currentPage: getTempCurrentPage(0),
                };
            }
            case 'filterFormChange': {
                return {
                    ...contextState,
                    recipesFilterForm: {
                        ...contextState.recipesFilterForm,
                        [action.fieldName]: action.value
                    }
                }
            }
            case 'loadRecipesPage': {
                //TODO: POST recipes search + page from action.value
                return {
                    ...contextState,
                    recipesPages: getTempRecipesPage(),
                    currentPage: getTempCurrentPage(action.value)
                };
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    useEffect(() => {
        dispatch({ type: 'filter' })
        dispatch({ type: 'refreshFiltersList' })
    }, [])

    return (
        <RecipeFilterContext.Provider value={contextState}>
            <RecipeFilterDispatchContext.Provider value={dispatch}>
                {children}
            </RecipeFilterDispatchContext.Provider>
        </RecipeFilterContext.Provider>
    )
}