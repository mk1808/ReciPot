import { useMemo } from 'react';
import { FaCircleInfo } from "react-icons/fa6";

import Tooltip from "./Tooltip";

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

    const renderedIcon = useMemo(_renderIcon, [renderIcon, className])

    return (
        <Tooltip placement={placement} title={value}>
            {renderedIcon}
        </Tooltip>
    )

    function _renderIcon() {
        return renderIcon ? renderIcon(`info-icon ${className}`) : renderDefaultIcon();
    }

    function renderDefaultIcon() {
        return <FaCircleInfo className={`info-icon ${className}`} />;
    }
}

export default Info;