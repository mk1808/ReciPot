import React, { useEffect, useContext, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { UsersContext, UsersDispatchContext } from '../context/UserContext';

const ProtectedRoute = ({ element }: any) => {
    const usersContext: any = useContext(UsersContext);
    const usersDispatchContext: any = useContext(UsersDispatchContext);
    const [waitingForUser, setWaitingForUser] = useState(!usersContext.user)

    useEffect(() => {
        if (!usersContext.user) {
            usersDispatchContext(
                { type: "refresh" }
            )
            setTimeout(() => {
                setWaitingForUser(false)
            }, 1000);
        }
    }, [])

    if (waitingForUser) {
        return <Spinner animation="border" role="status" className='spinner' variant='secondary'/>
    }

    if (!usersContext.user) {
        return <Navigate to="/noAccess" replace />;
    }
    return element;
};

export default ProtectedRoute;