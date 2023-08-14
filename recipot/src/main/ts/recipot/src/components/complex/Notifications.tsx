import { FaBell, FaRegBell, FaCheck } from "react-icons/fa6";
import './styles.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useTranslation } from "react-i18next";
import Badge from 'react-bootstrap/Badge';
import { Notification } from "../../data/types";
import { parseNotificationContent } from "../../utils/NotificationUtils";

function Notifications({
    notifications,
    onCheck
}: {
    notifications: Notification[],
    onCheck: (parameter: Notification) => void
}) {
    const { t } = useTranslation();

    return (
        <div className="notifications">
            <OverlayTrigger trigger="click" placement="bottom" overlay={renderPopover()} rootClose={true}>
                <div className="icon">
                    {renderIcon()}
                </div>
            </OverlayTrigger>
        </div >
    );

    function renderPopover() {
        return (
            <Popover id="notifications-popover" >
                <Popover.Header as="h3">{t('p.notifications')}</Popover.Header>
                <Popover.Body>
                    {notifications.map(renderNotification)}
                </Popover.Body>
            </Popover>
        );
    }

    function renderIcon() {
        if (notifications.length === 0) {
            return <FaRegBell />
        }
        return (
            <>
                <FaBell />
                <Badge pill bg="danger">{notifications.length}</Badge>
            </>
        )
    }

    function renderNotification(notification: Notification) {
        return (
            <div key={notification.id} className="notifications-notification d-flex align-items-center">
                <div>
                    <p className="title">{t('p.' + notification.type)}</p>
                    <p className="content">{parseNotificationContent(notification, t)}</p>
                </div>
                <FaCheck className="icon" onClick={e => onCheck(notification)} />
            </div>
        )
    }
}

export default Notifications;