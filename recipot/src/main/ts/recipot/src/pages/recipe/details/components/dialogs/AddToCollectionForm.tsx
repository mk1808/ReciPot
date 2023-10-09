import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FormSave } from "../../../../../data/utilTypes";
import FilteredSelect from "../../../../../components/complex/FilteredSelect";
import { RecipeCollection, Response } from "../../../../../data/types";
import recipeCollectionsApi from "../../../../../api/RecipeCollectionsApi";
import { mapDictionaryValueToSearchList } from "../../../../../utils/DictionariesUtils";

type Props = {
    formSave: FormSave<RecipeCollection>
};

function AddToCollectionForm({
    formSave
}: Props,
    ref: any) {

    const { t } = useTranslation();
    const [filteredCollections, setFilteredCollections] = useState<any[]>([]);
    const [allCollections, setAllCollections] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const form = useRef<any>();

    useEffect(() => {
        getAllCollections();
    }, [])

    useImperativeHandle(ref, () => ({
        submitForm() {
            handleSubmit();
        }
    }));

    function getAllCollections() {
        recipeCollectionsApi.getUserRecipeCollections((response: Response<RecipeCollection[]>) => {
            setAllCollections(filterOutDefaultCollections(response.value));
            setFilteredCollections(mapDictionaryValueToSearchList(response.value));
        })
    }

    function filterOutDefaultCollections(collections: RecipeCollection[]) {
        return collections.filter(collection => collection.canDelete);
    }

    function onCategorySearchCallback(phrase: string) {
        setFilteredCollections(mapDictionaryValueToSearchList(searchCategory(phrase)));
    }

    function searchCategory(phrase: string): RecipeCollection[] {
        return allCollections.filter(collection => collection.name.indexOf(phrase) >= 0);
    }

    function handleSubmit() {
        if (selectedCategory != null) {
            formSave.onSubmit(selectedCategory.value);
        }
    };

    return (
        <Form noValidate validated className="mt-3 text-start" ref={form}>
            {renderCollectionInput()}
        </Form>
    )

    function renderCollectionInput() {
        return (
            <FilteredSelect
                multiple={false}
                allowNew
                options={filteredCollections}
                onSearchCallback={onCategorySearchCallback}
                onSelectCallback={setSelectedCategory}
                highlightValidity
                hierarchical
                className="mb-3"
                label={t('p.collectionToChooseOrAdd')}
                required
                isValid
            />
        )
    }

}

export default forwardRef(AddToCollectionForm);