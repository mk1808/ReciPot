import { createContext, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";

import dictionariesApi from "../api/DictionariesApi";
import { RecipeAccessType, RecipeAmountOfDishes, RecipeDifficulty, RecipeRequiredEffort, Response } from "../data/types";
import { SelectOption } from "../data/utilTypes";
import { getConverters } from "../utils/DictionariesUtils";

type contextStateModel = {
    enums: enumsStateModel
};

export type enumsStateModel = {
    difficulties: SelectOption<RecipeDifficulty>[],
    requiredEfforts: SelectOption<RecipeRequiredEffort>[],
    amountsOfDishes: SelectOption<RecipeAmountOfDishes>[],
    accessTypes: SelectOption<RecipeAccessType>[]
}

type ReducerActionProps = {
    type: EnumContextType,
    enumType?: any,
    singleEnum?: any
}

export enum EnumContextType {
    Refresh = "refresh",
    Update = "update"
};

export const EnumDictionaryContext = createContext<contextStateModel>({ enums: {} as enumsStateModel });

export const EnumDictionaryDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

export const EnumDictionaryContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const [enums, dispatch]: [enumsStateModel, (action: ReducerActionProps) => any] = useReducer(
        enumsReducer, {} as enumsStateModel
    );
    useEffect(() => {
        dispatch({ type: EnumContextType.Refresh })
    }, [])

    function enumsReducer(enums: enumsStateModel, action: ReducerActionProps): enumsStateModel {
        switch (action.type) {
            case EnumContextType.Refresh: {
                dictionariesApi.getAllDifficulties((response) => onSuccessRefresh(response, "difficulties"), () => { })
                dictionariesApi.getAllRequiredEfforts((response) => onSuccessRefresh(response, "requiredEfforts"), () => { })
                dictionariesApi.getAllAmountsOfDishes((response) => onSuccessRefresh(response, "amountsOfDishes"), () => { })
                dictionariesApi.getAllAccessTypes((response) => onSuccessRefresh(response, "accessTypes"), () => { })
                return enums;
            }
            case EnumContextType.Update: {
                return { ...enums, [action.enumType]: action.singleEnum };
            }

            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    function onSuccessRefresh(response: Response<any>, enumType: any) {
        let converter = getConverters();
        type ObjectKey = keyof typeof converter;
        let singleConverter: any = converter[enumType as ObjectKey];
        let action = { singleEnum: singleConverter(t, response.value), type: EnumContextType.Update, enumType: enumType }
        dispatch(action);
    };

    return (
        <EnumDictionaryContext.Provider value={{ enums: enums }}>
            <EnumDictionaryDispatchContext.Provider value={dispatch}>
                {children}
            </EnumDictionaryDispatchContext.Provider>
        </EnumDictionaryContext.Provider>
    )
}