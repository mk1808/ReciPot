import { createContext, useEffect, Context, useReducer } from "react";
import { Response } from "../data/types";
import { useTranslation } from "react-i18next";
import dictionariesApi from "../api/DictionariesApi";
import { getConverters } from "../utils/DictionariesUtils";

export const EnumDictionaryContext: Context<any> = createContext({});

export const EnumDictionaryDispatchContext = createContext<Function>(() => { });

export const EnumDictionaryContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const [enums, dispatch]: [any, Function] = useReducer(
        enumsReducer, {}
    );

    function onSuccessRefresh(response: Response<any>, enumType: any) {
        let converter = getConverters();
        type ObjectKey = keyof typeof converter;
        let singleConverter: any = converter[enumType as ObjectKey];
        let action = { singleEnum: singleConverter(t, response.value), type: 'update', enumType: enumType }
        dispatch(action);
    };

    function enumsReducer(enums: {}, action: any) {
        switch (action.type) {
            case 'refresh': {
                dictionariesApi.getAllDifficulties((response) => onSuccessRefresh(response, "difficulties"), () => { })
                dictionariesApi.getAllRequiredEfforts((response) => onSuccessRefresh(response, "requiredEfforts"), () => { })
                dictionariesApi.getAllAmountsOfDishes((response) => onSuccessRefresh(response, "amountsOfDishes"), () => { })
                dictionariesApi.getAllAccessTypes((response) => onSuccessRefresh(response, "accessTypes"), () => { })
                return enums;
            }
            case 'update': {
                return { ...enums, [action.enumType]: action.singleEnum };
            }

            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    useEffect(() => {
        dispatch({ type: 'refresh' })
    }, [])

    return (
        <EnumDictionaryContext.Provider value={{ enums: enums }}>
            <EnumDictionaryDispatchContext.Provider value={dispatch}>
                {children}
            </EnumDictionaryDispatchContext.Provider>
        </EnumDictionaryContext.Provider>
    )
}