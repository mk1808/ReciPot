import MyButton from "../../../../components/basicUi/MyButton";
import { Stack } from "react-bootstrap";

function CollectionList() {

    return (
        <Stack>
            {renderCollection("kolekcja 1")}
            {renderCollection("kolekcja 2")}
            {renderCollection("kolekcja 3")}
            {renderCollection("kolekcja 4")}
            {renderCollection("kolekcja 5")}
        </Stack>
    );

    function renderCollection(collection: string) {
        return <MyButton.Secondary>{collection}</MyButton.Secondary>
    }

}

export default CollectionList;