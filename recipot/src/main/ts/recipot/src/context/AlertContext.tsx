import { createContext, useContext, useReducer } from 'react';
import MyAlert from '../components/basicUi/MyAlert';

export const AlertsContext = createContext<any[]>([]);

export const AlertsDispatchContext = createContext<Function>(() => { });


function alertsReducer(alerts: any[], action: any) {
    switch (action.type) {
        case 'added': {
            if (alerts.filter(alert => alert.message == action.message).length > 0) {
                return alerts;
            }
            let index = alerts && alerts.length > 0 ? alerts[alerts.length - 1].id + 1 : 1;
            return [...alerts, {
                id: index,
                message: action.message,
                alertType: action.alertType
            }];
        }
        case 'deleted': {
            return alerts.filter(alert => alert.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function AlertContextProvider({ children }: any) {
    const [alerts, dispatch]: [any, Function] = useReducer(
        alertsReducer,
        []
    );

    return (
        <AlertsContext.Provider value={alerts}>
            <AlertsDispatchContext.Provider value={dispatch}>
                {children}
                <AlertManager alerts={alerts}></AlertManager>
            </AlertsDispatchContext.Provider>
        </AlertsContext.Provider>
    );


}

export function AlertManager({ alerts = [] }: any) {

    function getAlert(alert: any): any {
        switch (alert.alertType) {
            case 'primary':
                return (<MyAlert.Primary key={alert.id} >{alert.message}</MyAlert.Primary>)
            case 'success': return (<MyAlert.Success key={alert.id} >{alert.message}</MyAlert.Success>)
            case 'danger': return (<MyAlert.Error key={alert.id} >{alert.message}</MyAlert.Error>)
        }
    }

    return (<div className="alert-container">
        {alerts.map((alert: any) => {

            return (getAlert(alert));
        })
        }
    </div>
    )
}


export default AlertContextProvider;