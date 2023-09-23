import { Stack } from "react-bootstrap";
import HashTagBadge from "./HashTagBadge";

function HashTagList({ hashTags = [] }: { hashTags:Array<any> }) {
    return (
        <Stack direction="horizontal" className='hash-tags'>
            {
                hashTags.map((tag: any) => (
                    <HashTagBadge text={tag.name} key={tag.id} />)
                )
            }
        </Stack>
    )
}

export default HashTagList;