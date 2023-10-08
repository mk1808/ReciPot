import { FaBell, FaRegBell, FaCheck, FaAnglesRight } from "react-icons/fa6";
import './styles.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useTranslation } from "react-i18next";
import Badge from 'react-bootstrap/Badge';
import { Notification } from "../../data/types";
import { parseNotificationContent } from "../../utils/NotificationUtils";
import { Stack } from "react-bootstrap";
import Tooltip from "../basicUi/Tooltip";
import useMyNav from "../../hooks/useMyNav";

function Notifications({
    notifications,
    onConfirm
}: {
    notifications: Notification[],
    onConfirm: (parameter: Notification) => void
}) {
    const { t } = useTranslation();
    const nav = useMyNav();

    function goToRecipe(notification: Notification) {
        const value = JSON.parse(notification.value);
        nav.toRecipe(value.recipeId);
    }

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
                {renderActionButtons(notification)}
            </div>
        )
    }

    function renderActionButtons(notification: Notification) {
        return (
            <Stack className="align-self-center">
                <Tooltip title={t('p.confirmNotification')}><FaCheck className="icon" onClick={e => onConfirm(notification)} /></Tooltip>
                <Tooltip title={t('p.goToRecipe')}><FaAnglesRight className="mt-3 icon" onClick={e => goToRecipe(notification)} /></Tooltip>
            </Stack>
        )
    }
}

export default Notifications;