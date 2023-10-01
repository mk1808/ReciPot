import { Stack } from "react-bootstrap";
import HashTagBadge from "./HashTagBadge";

function HashTagList({ hashTags = [], onClick }: { hashTags: Array<any>, onClick: (tag: any) => any }) {
    return (
        <Stack direction="horizontal" className='hash-tags'>
            {
                hashTags.map((tag: any) => (
                    <HashTagBadge text={tag.name} key={tag.id} onClick={() => onClick(tag)} />)
                )
            }
        </Stack>
    )
}

export default HashTagList;