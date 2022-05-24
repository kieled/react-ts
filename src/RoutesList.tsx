import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./containers/Profile/Login";
import PrivateRoute from "./PrivateRoute";
import OrderList from "./containers/Profile/OrderList/OrderList";
import MyBalance from "./containers/Profile/MyBalance/MyBalance";
import MyChannels from "./containers/Profile/MyChannels/MyChannels";
import MyOrders from "./containers/Profile/MyOrders/MyOrders";
import OrderView from "./containers/Profile/OrderView";
import AddChannel from "./containers/Profile/AddChannel";
import Rating from "./containers/Profile/Rating/Rating";
import AdminRoute from "./AdminRoute";
import Orders from "./containers/Admin/Orders/Orders";
import Applications from "./containers/Admin/Applications/Applications";
import Channels from "./containers/Admin/Channels/Channels";
import Products from "./containers/Admin/Products/Products";
import Users from "./containers/Admin/Users/Users";
import Withdraws from "./containers/Admin/Withdraws/Withdraws";
import Transactions from "./containers/Admin/Transactions/Transactions";
import Designs from "./containers/Admin/Designs/Designs";
import DesignCategories from "./containers/Admin/DesignCategories/DesignCategories";
import MiniMarket from "./containers/Admin/MiniMarket/MiniMarket";
import ProductsStats from "./containers/Admin/ProductsStats/ProductsStats";
import SendMessages from "./containers/Admin/SendMessages";
import Templates from "./containers/Admin/Templates";
import {checkAuthenticated, load_user} from "./actions/auth";
import {useAppDispatch} from "./hooks";

const RoutesList = () => {
    const dispatch = useAppDispatch()

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthenticated())
            await dispatch(load_user())
        }
        checkAuth().then(() => setLoad(false));
    }, [ load ])

    if (load) {
        return null
    }
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<PrivateRoute/>}>
                <Route index element={<OrderList/>}/>
                <Route path='/balance' element={<MyBalance/>}/>
                <Route path='/channels' element={<MyChannels/>}/>
                <Route path='/orders' element={<MyOrders/>}/>
                <Route path='/order/:id' element={<OrderView/>}/>
                <Route path='/add' element={<AddChannel/>}/>
                <Route path='/rating' element={<Rating/>}/>
            </Route>
            <Route path='/admin' element={<AdminRoute/>}>
                <Route path='orders' element={<Orders/>}/>
                <Route path='apps' element={<Applications/>}/>
                <Route path='channels' element={<Channels/>}/>
                <Route path='products' element={<Products/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='withdraws' element={<Withdraws/>}/>
                <Route path='transactions' element={<Transactions/>}/>
                <Route path='designs' element={<Designs/>}/>
                <Route path='categories' element={<DesignCategories/>}/>
                <Route path='mini' element={<MiniMarket/>}/>
                <Route path='stats' element={<ProductsStats/>}/>
                <Route path='messages' element={<SendMessages/>}/>
                <Route path='templates' element={<Templates/>}/>
            </Route>
        </Routes>
    )
};


export default RoutesList