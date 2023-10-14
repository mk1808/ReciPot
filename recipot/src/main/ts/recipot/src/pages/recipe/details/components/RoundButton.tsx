import MyButton from "../../../../components/basicUi/MyButton";
import Tooltip from "../../../../components/basicUi/Tooltip";

type Props = {
    tooltipText: string,
    onClick: Function,
    shouldShow: boolean,
    children: any
};

function RoundButton({
    tooltipText,
    onClick,
    shouldShow,
    children
}: Props) {
    if (shouldShow) {
        return (
            <div>
                <Tooltip title={tooltipText}>
                    <MyButton.Primary onClick={onClick} className="round mx-4">
                        {children}
                    </MyButton.Primary>
                </Tooltip>
            </div>
        );
    }
    return <></>
}

export default RoundButton;