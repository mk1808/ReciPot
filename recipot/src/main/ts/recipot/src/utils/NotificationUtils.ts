import { Notification } from "../data/types";

export function parseNotificationContent(notification: Notification, t: Function) {
    const { senderUser, recipeName, value } = JSON.parse(notification.value);

    switch (notification.type) {
        case "SHARED_RECIPE":
            return `${t('p.senderUser')} ${senderUser} ${t('p.sharedRecipe')} ${recipeName} ${t('p.withNote')} ${value}`
        case "RECIPE_COMMENTED":
            return `${t('p.senderUser')} ${senderUser} ${t('p.commentedRecipe')} ${recipeName}:\n${value}`
        case "RECIPE_RATED":
            return `${t('p.senderUser')} ${senderUser} ${t('p.ratedRecipe')} ${recipeName}  ${t('p.withRate')} ${value}`
    }
}