import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "./hooks";

const PrivateRoute = () => {
    const {isAuthenticated, user} = useAppSelector(state => state.authSlice)

    if (isAuthenticated) {
        if (user?.is_admin) {
            return <Navigate to="/admin/orders"/>
        } else {
            return <Outlet />
        }
    } else {
        return <Navigate to='/login' />
    }
}

export default PrivateRoute;