import Tooltip from "./Tooltip";
import { FaCircleInfo } from "react-icons/fa6";

function Info({ placement = "right", value = "", renderIcon, className = "" }: { placement?: string, value: string, renderIcon?: any, className?: string }) {
    return (
        <Tooltip placement={placement} title={value}>
            {renderIcon ? renderIcon(`info-icon ${className}`) : <FaCircleInfo className={`info-icon ${className}`} />}
        </Tooltip>
    )
}

export default Info;