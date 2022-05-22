import React, {useEffect} from "react";
import {Form, Input} from 'antd';
import {login} from "../../actions/auth";
import {Navigate} from 'react-router-dom';
import {ReactComponent as AdminLogo} from "../../svg/admin-logo.svg";
import {layoutActions} from "../../reducers/layout";
import {useAppDispatch, useAppSelector} from "../../hooks";

const Login = () => {
    const {isAuthenticated} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.title = 'Авторизация';
        if (isAuthenticated) {
            dispatch(layoutActions.header_on())
        }
    }, [])

    const onFinish = async (e: { username: string, password: string }) => {
        await dispatch(login(e.username, e.password))
    };

    if (isAuthenticated) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="login-page">
            <Form name="basic" className="login-form" initialValues={{remember: true}}
                  onFinish={onFinish} autoComplete="off">
                <div className="login-logo-block">
                    <AdminLogo className="login-logo"/>
                </div>
                <Form.Item name="username" className="admin-input"
                           rules={[{required: true, message: 'Введите имя пользователя!'}]}>
                    <Input className="grey-place" placeholder="Логин"/>
                </Form.Item>

                <Form.Item name="password" className="login-input-passwd"
                           rules={[{required: true, message: 'Введите пароль!'}]}>
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>
                <Form.Item>
                    <button className="login-btn">
                        Войти
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default Login