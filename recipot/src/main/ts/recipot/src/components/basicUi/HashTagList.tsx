import { Stack } from "react-bootstrap";
import HashTagBadge from "./HashTagBadge";
import { HashTag } from "../../data/types";

type Props = {
    hashTags: HashTag[],
    onClick: (tag: HashTag) => any
};

function HashTagList({
    hashTags,
    onClick
}: Props) {

    return (
        <Stack direction="horizontal" className='hash-tags'>
            {renderHashTags()}
        </Stack>
    )

    function renderHashTags() {
        return hashTags.map((tag: any) => (
            <div className="me-2" key={tag.id}>
                <HashTagBadge text={tag.name} onClick={() => onClick(tag)} />
            </div>
        ));
    }
}

export default HashTagList;