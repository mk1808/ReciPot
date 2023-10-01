import { Badge } from "react-bootstrap";
import './styles.scss';
import { initFcn } from "../../utils/ObjectUtils";

function HashTagBadge({ text = "", onClick = initFcn() }: { text: string, onClick?: any }) {
    return (
        <span className="m-2 h5">
            <Badge pill bg="primary" className="pe-3 ps-3" onClick={onClick}>{text}</Badge>
        </span>
    );
}

export default HashTagBadge;