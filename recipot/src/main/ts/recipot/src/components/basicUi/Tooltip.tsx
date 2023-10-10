import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BootstrapTooltip from 'react-bootstrap/Tooltip';
import './styles.scss';

type Props = {
    children: any,
    title: string,
    placement?: any
};

function Tooltip({
    children,
    title,
    placement = "bottom"
}: Props) {

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <div className='tooltip-trigger-children'>{children}</div>
        </OverlayTrigger>
    );

    function renderTooltip(props: any) {
        return (
            <BootstrapTooltip {...props}>
                {title}
            </BootstrapTooltip>
        );
    }

}

export default Tooltip;