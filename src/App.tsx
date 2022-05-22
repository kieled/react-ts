import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Layout from "./hocs/Layout";
import {Provider} from "react-redux";
import store from "./store";
import React from "react";
import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import RoutesList from "./RoutesList";

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <Router>
                    <ToastContainer/>
                    <Layout children={
                        <RoutesList />
                    }/>
                </Router>
            </Provider>
        </ConfigProvider>
    )
}

export default App;