import { useEffect, useState } from "react";

import dictionariesApi from "../api/DictionariesApi";
import { CategoryDto, Response } from "../data/types";
import { SelectOption } from "../data/utilTypes";
import { mapCategoriesToSearchList, searchCategory } from "../utils/DictionariesUtils";

function useCategories(): [SelectOption<CategoryDto>[], (phrase: string) => any, CategoryDto[]] {
    const [filteredCategories, setFilteredCategories] = useState<SelectOption<CategoryDto>[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
    
    useEffect(() => {
        getAllCategories();
    }, [])

    function getAllCategories() {
        dictionariesApi.getAllCategories((response: Response<CategoryDto[]>) => {
            setAllCategories(response.value);
            setFilteredCategories(mapCategoriesToSearchList(response.value));
        })
    }
    
    function filterCategories(phrase: string) {
        setFilteredCategories(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    return [filteredCategories, filterCategories, allCategories];
}

export default useCategories;