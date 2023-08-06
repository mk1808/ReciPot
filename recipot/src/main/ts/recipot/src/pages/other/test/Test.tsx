import { Stack } from "react-bootstrap";
import './styles.scss';
import FilteredSelect from "../../../components/complex/FilteredSelect";
import { useEffect, useState } from "react";
import dictionariesApi from "../../../api/DictionariesApi";
import { HashTag } from "../../../data/types";

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
                <div className="p-4 text-start test-szer-3">itemitem</div>
            </div>


        </Stack>
        <Stack className="" direction="horizontal" gap={5}>
            <div className="p-4">
                <FilteredSelectTest />
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


    return <FilteredSelect label="Test wartości" values={filteredSelectValues} onSearchCallback={onSearchCallback} defaultValue={{ value: "asd", label: "dsa" }}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} />
}

export default Test;