import { Notification } from "../data/types";

export function parseNotificationContent(notification: Notification, t: Function) {
    const value = JSON.parse(notification.value);
    switch (notification.type) {
        case "SHARED_RECIPE": return `${t('p.senderUser')} ${value.senderUser} ${t('p.sharedRecipe')} ${value.recipeName} ${t('p.withNote')} ${value.value}`
        case "RECIPE_COMMENTED": return `${t('p.senderUser')} ${value.senderUser} ${t('p.commentedRecipe')} ${value.recipeName}:\n${value.value}`
        case "RECIPE_RATED": return `${t('p.senderUser')} ${value.senderUser} ${t('p.ratedRecipe')} ${value.recipeName}  ${t('p.withRate')} ${value.value}`
    }
}