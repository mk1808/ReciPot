import Tooltip from "./Tooltip";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
    value: string,
    renderIcon?: any,
    placement?: string,
    className?: string
};

function Info({
    value,
    renderIcon,
    placement = "right",
    className = ""
}: Props) {

    return (
        <Tooltip placement={placement} title={value}>
            {renderIcon ? renderIcon(`info-icon ${className}`) : <FaCircleInfo className={`info-icon ${className}`} />}
        </Tooltip>
    )
}

export default Info;