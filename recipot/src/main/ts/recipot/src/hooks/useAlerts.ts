import { useContext } from 'react';
import { useTranslation } from "react-i18next";

import { AlertsContextType, AlertsDispatchContext } from "../context/AlertContext";
import { Response } from "../data/types";


function useAlerts() {
    const { t } = useTranslation();
    const alertDispatchContext = useContext(AlertsDispatchContext);

    function showErrorAlert(message: string) {
        alertDispatchContext({
            type: AlertsContextType.Added,
            message: message,
            alertType: "danger"
        })
    }

    function showSuccessAlert(message: string) {
        alertDispatchContext({
            type: AlertsContextType.Added,
            message: message,
            alertType: "success"
        })
    }

    function onShowAlertOnErrorResponse(response: Response<any>) {
        try {
            const errorDetails = JSON.parse(response.details);
            errorDetails.forEach((errorMessage: string) => showErrorAlert(t(errorMessage)));
        } catch (e) {
            showErrorAlert(t(response.message));
        }
    }
    return { showErrorAlert, showSuccessAlert, onShowAlertOnErrorResponse }
}

export default useAlerts;