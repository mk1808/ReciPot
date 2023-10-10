import { createContext, useReducer } from 'react';
import MyAlert from '../components/basicUi/MyAlert';

type ReducerActionProps = {
    type: AlertsContextType,
    message?: any,
    alertType?: any,
    id?: any
}

export enum AlertsContextType {
    Added = "added",
    Deleted = "deleted"
};

export const AlertsContext = createContext<any[]>([]);

export const AlertsDispatchContext = createContext<(action:ReducerActionProps) => any>((action:ReducerActionProps) => {});

function alertsReducer(alerts: any[], action: ReducerActionProps) {
    switch (action.type) {
        case AlertsContextType.Added: {
            if (alerts.filter(alert => alert.message === action.message).length > 0) {
                return alerts;
            }
            let index = alerts && alerts.length > 0 ? alerts[alerts.length - 1].id + 1 : 1;
            return [...alerts, {
                id: index,
                message: action.message,
                alertType: action.alertType
            }];
        }
        case AlertsContextType.Deleted: {
            return alerts.filter(alert => alert.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function AlertContextProvider({ children }: any) {
    const [alerts, dispatch]: [any, (action:ReducerActionProps) => any] = useReducer(
        alertsReducer,
        []
    );

    function onAlertClose(alert: any) {
        dispatch({
            type: AlertsContextType.Deleted,
            id: alert.id
        })
    }

    return (
        <AlertsContext.Provider value={alerts}>
            <AlertsDispatchContext.Provider value={dispatch}>
                {children}
                <AlertManager alerts={alerts} onClose={onAlertClose}></AlertManager>
            </AlertsDispatchContext.Provider>
        </AlertsContext.Provider>
    );
}

function AlertManager({ alerts = [], onClose }: any) {
    const commonProps = (alert: any) => ({
        key: alert.id,
        onClose: () => onClose(alert)
    })
    function getAlert(alert: any): any {
        switch (alert.alertType) {
            case 'primary': return <MyAlert.Primary {...commonProps(alert)}>{alert.message}</MyAlert.Primary>
            case 'success': return <MyAlert.Success {...commonProps(alert)}>{alert.message}</MyAlert.Success>
            case 'danger': return <MyAlert.Error {...commonProps(alert)}>{alert.message}</MyAlert.Error>
        }
    }

    return (
        <div className="alert-container">
            {alerts.map((alert: any) => (getAlert(alert)))}
        </div>
    )
}

export default AlertContextProvider;