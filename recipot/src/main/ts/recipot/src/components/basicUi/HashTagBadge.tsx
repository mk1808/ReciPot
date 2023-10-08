import { Badge } from "react-bootstrap";
import './styles.scss';

type Props = {
    text: string,
    onClick?: () => any
};

function HashTagBadge({
    text,
    onClick = () => { }
}: Props) {

    return (
        <span className="my-2 h5">
            <Badge bg="primary" className="pe-3 ps-3" onClick={onClick}>{text}</Badge>
        </span>
    );
}

export default HashTagBadge;