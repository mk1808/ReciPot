import Tooltip from "./Tooltip";
import { FaCircleInfo } from "react-icons/fa6";

function Info({ placement = "right", value = "" }: any) {
    return <Tooltip placement={placement} title={value}><FaCircleInfo className="info-icon" /></Tooltip>
}

export default Info;