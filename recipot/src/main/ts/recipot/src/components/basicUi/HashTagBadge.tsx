import { Badge } from "react-bootstrap";
import './styles.scss';

function HashTagBadge({ text = "" }: any) {
    return (
        <div>
            <h5 className="m-2">
                <Badge pill bg="primary" className="pe-3 ps-3">{text}</Badge>
            </h5>
        </div>
    );
}

export default HashTagBadge;