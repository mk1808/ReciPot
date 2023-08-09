import { useEffect, useRef, useState } from 'react';
import Notifications from '../../../components/complex/Notifications';
import notificationsApi from '../../../api/NotificationsApi';
import { Notification, Response } from '../../../data/types';
import { removeValue } from '../../../utils/ListUtils';

function NotificationManager() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const lastRequestTime = useRef(0);
    const notificationsClosure = useRef(notifications);

    useEffect(() => {
        notificationsClosure.current = notifications
    }, [notifications])

    useEffect(() => {
        const checkNotificationsInterval = setInterval(checkNotifications, 5000);
        checkNotifications();
        return () => {
            clearInterval(checkNotificationsInterval);
        }
    }, [])

    function checkNotifications() {
        notificationsApi.getLastNotifications({ timeFrom: (lastRequestTime.current) }, (response) => onCheckNotificationsResponse(response))
        lastRequestTime.current = new Date().getTime();
    }

    function onCheckNotificationsResponse(response: Response<Notification[]>): any {
        setNotifications([...notificationsClosure.current, ...response.value]);
    }

    function onCheck(notification: Notification) {
        notificationsApi.deleteNotification(notification.id, () => {
            setNotifications(removeValue(notificationsClosure.current, notification))
        });

    }

    return <Notifications notifications={notifications} onCheck={onCheck} />
}

export default NotificationManager;