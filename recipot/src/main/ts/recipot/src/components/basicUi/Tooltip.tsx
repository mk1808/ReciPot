import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BootstrapTooltip from 'react-bootstrap/Tooltip';
import './styles.scss';

function Tooltip({ children, placement = "right", title = "" }: any) {
    const renderTooltip = (props: any) => (
        <BootstrapTooltip  {...props}>
            {title}
        </BootstrapTooltip>
    );

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <div className='tooltip-trigger-children'>{children}</div>
        </OverlayTrigger>
    );

}

export default Tooltip;