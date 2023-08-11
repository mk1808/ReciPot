import { Badge } from "react-bootstrap";
import './styles.scss';

function HashTagBadge({ text = "" }: any) {
    return (
        <span className="m-2 h5">
            <Badge pill bg="primary" className="pe-3 ps-3">{text}</Badge>
        </span>
    );
}

export default HashTagBadge;