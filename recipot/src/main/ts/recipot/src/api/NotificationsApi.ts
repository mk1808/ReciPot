import { Response } from "../data/types";
import { createPathParams } from "../utils/RestUtils";
import restClient from "./RestClient";

function NotificationsApi() {
    const PREFIX = '/notifications';

    const getLastNotifications = (params: { timeFrom?: number }, onSuccess: (response: Response<Notification[]>) => any, onError?: (response: Response<Notification[]>) => any) => {
        var pathParams = createPathParams(params);
        restClient.get(`${PREFIX}?${pathParams}`, onSuccess, onError)
    }

    const createNotification = (body: Notification, onSuccess: (response: Response<Notification>) => any, onError?: (response: Response<Notification>) => any) => {
        restClient.post(`${PREFIX}`, body, onSuccess, onError)
    }

    const deleteNotification = (notificationId: string, onSuccess: (response: Response<any>) => any, onError?: (response: Response<any>) => any) => {
        restClient.delete(`${PREFIX}/${notificationId}`, onSuccess, onError)
    }

    return { getLastNotifications, createNotification, deleteNotification }
}

const notificationsApi = NotificationsApi();
export default notificationsApi;