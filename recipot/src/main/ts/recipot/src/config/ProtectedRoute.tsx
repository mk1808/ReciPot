import { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContextType, UsersContext, UsersDispatchContext } from '../context/UserContext';
import MySpinner from '../components/basicUi/MySpinner';

const ProtectedRoute = ({ element }: { element: any }) => {
    const user: any = useContext(UsersContext);
    const usersDispatchContext: any = useContext(UsersDispatchContext);
    const [waitingForUser, setWaitingForUser] = useState(!user);

    useEffect(() => {
        if (!user) {
            usersDispatchContext(
                { type: UserContextType.Refresh }
            )
            setTimeout(() => {
                setWaitingForUser(false)
            }, 1000);
        }
    }, [])

    if (waitingForUser) {
        return <MySpinner />
    }

    if (!user) {
        return <Navigate to="/noAccess" replace />;
    }
    return element;
};

export default ProtectedRoute;