import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "./hooks";


const AdminRoute = () => {
    const {isAuthenticated, user} = useAppSelector(state => state.authSlice)

    if (isAuthenticated) {
        if (user?.is_admin) {
            return <Outlet />
        } else {
            return <Navigate to="/"/>
        }
    } else {
        return <Navigate to='/login'/>
    }
}


export default AdminRoute