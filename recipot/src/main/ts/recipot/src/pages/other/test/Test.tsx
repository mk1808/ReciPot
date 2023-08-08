import { Stack } from "react-bootstrap";
import './styles.scss';
import FilteredSelect from "../../../components/complex/FilteredSelect";
import { useEffect, useState } from "react";
import dictionariesApi from "../../../api/DictionariesApi";
import { Category, CategoryDto, HashTag, Response } from "../../../data/types";
import HashTagBadge from "../../../components/basicUi/HashTagBadge";
import SideOffcanvas from "../../../components/basicUi/SideOffcanvas";
import FilteredMultiSelect from "../../../components/complex/FilteredMultiSelect";
import FilteredHierarchicalSelect from "../../../components/complex/FilteredHierarchicalSelect";

function Test() {
    return (<>
        <h1>Test</h1>
        <Stack className=" justify-content-center" direction="horizontal" gap={5}>
            <div className="p-4 test-szer-1">First item</div>
            <div className="p-4 test-szer-1">Second item</div>
            <div className="p-4 test-szer-1">Third item</div>
        </Stack>
        <Stack className=" justify-content-center mt-5" direction="horizontal" gap={5}>
            <div className="p-4 mb-2 text-start test-szer-2">
                <div className="p-4 mb-3 text-start test-szer-3">itemitem</div>
                <Stack className=" mt-5" direction="horizontal">
                    <HashTagBadge text="Obiady" />
                    <HashTagBadge text="Zdrowe" />
                    <HashTagBadge text="Wegetariańskie" />
                </Stack>

            </div>
        </Stack>

        <SideOffcanvas title="Offcanvas">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
        </SideOffcanvas>

        <Stack className="" direction="horizontal" gap={5}>
            <div className="p-4">
                <FilteredSelectTest />
            </div>
            <div className="p-4">
                <FilteredMultiSelectTest />
            </div>
            <div className="p-4">
                <FilteredHierarchicalSelectTest></FilteredHierarchicalSelectTest>
            </div>
        </Stack>

    </>


    );


}

function FilteredSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { setFilteredSelectValues(mapHashTagToSearchList(response.value.content)) })
    }

    function mapHashTagToSearchList(hashTags: HashTag[]) {
        return hashTags.map(hashTag => { return { value: hashTag, label: hashTag.name } })
    }

    useEffect(() => {
        onFilteredSelectSearchCallback('');
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        console.log("onNewValueCallback", value)
    }


    return <FilteredSelect label="Test wartości" valuesList={filteredSelectValues} onSearchCallback={onSearchCallback} defaultValue={{ value: "asd", label: "dsa" }}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} allowNew={true} />
}

function FilteredMultiSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { setFilteredSelectValues(mapHashTagToSearchList(response.value.content)) })
    }

    function mapHashTagToSearchList(hashTags: HashTag[]) {
        return hashTags.map(hashTag => { return { value: hashTag, label: hashTag.name } })
    }

    useEffect(() => {
        onFilteredSelectSearchCallback('');
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        console.log("onNewValueCallback", value)
    }


    return <FilteredMultiSelect label="Test multiSelect" valuesList={filteredSelectValues} onSearchCallback={onSearchCallback} allowNew={true}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} defaultValue={[{ label: "test123" }, { label: "abc_111" }]} />
}


function FilteredHierarchicalSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        setFilteredSelectValues(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    function searchCategory(categories: CategoryDto[], phrase: string): any[] {
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

    function checkCategoryContainsPhrase(category: CategoryDto, phrase: string) {
        return category.name.indexOf(phrase) >= 0;
    }

    function mapCategoriesToSearchList(categories: any[]): any[] {
        return categories.map(category => { return { value: category, label: category.name, children: mapCategoriesToSearchList(category.children) } })
    }

    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<Category[]>) => {
            setAllCategories(response.value)
            setFilteredSelectValues(mapCategoriesToSearchList(response.value))
        })
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        console.log("onNewValueCallback", value)
    }


    return <FilteredHierarchicalSelect label="Test hierarchical Select" valuesList={filteredSelectValues} onSearchCallback={onSearchCallback}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} allowNew={false} />
}

export default Test;