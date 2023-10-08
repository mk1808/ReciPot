import { Stack } from "react-bootstrap";
import HashTagBadge from "./HashTagBadge";

type Props = {
    hashTags: Array<any>,
    onClick: (tag: any) => any
};

function HashTagList({
    hashTags,
    onClick
}: Props) {

    return (
        <Stack direction="horizontal" className='hash-tags'>
            {
                hashTags.map((tag: any) => (
                    <div className="me-2" key={tag.id}>
                        <HashTagBadge text={tag.name} onClick={() => onClick(tag)} />
                    </div>
                ))
            }
        </Stack>
    )
}

export default HashTagList;