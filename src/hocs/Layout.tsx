import React, {useEffect, useState} from "react";
import {Button, Layout as ALayout, Menu, Row} from "antd";
import {logout} from "../actions/auth";
import {layoutActions} from "../reducers/layout";
import {Link, useNavigate} from "react-router-dom";
import "../css/layout.css";
import {ReactComponent as LogOut} from "../svg/logout.svg";
import {ReactComponent as AdminLogo} from "../svg/admin-logo.svg";
import {MenuOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../hooks";

const {Header, Content, Sider} = ALayout;

export default (props: any) => {
    const {name, header} = useAppSelector(state=> state.layoutSlice)
    const {user} = useAppSelector(state=> state.authSlice)
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname !== "/login") {
            dispatch(layoutActions.header_on())
        } else {
            dispatch(layoutActions.header_off())
        }
    }, [  ])

    const onClick = () => {
        setOpen(!open)
    }

    const MenuItems = [
        {
            key: 1,
            label: 'Заказы'
        },
        {
            key: 2,
            label: 'Заявки'
        },
        {
            key: 3,
            label: 'Каналы'
        },
        {
            key: 'sub1',
            label: 'Товары',
            children: [
                {
                    key: 4,
                    label: 'Товары'
                },
                {
                    key: 5,
                    label: 'Анализ продаж'
                }
            ]
        },
        {
            key: 6,
            label: 'Сотрудники'
        },
        {
            key: 'sub2',
            label: 'Финансы',
            children: [
                {
                    key: 7,
                    label: 'Заявки на вывод'
                },
                {
                    key: 8,
                    label: 'Операции с балансом'
                },
            ]
        },
        {
            key: 'sub3',
            label: 'Дизайн',
            children: [
                {
                    key: 9,
                    label: 'Дизайн каналов'
                },
                {
                    key: 10,
                    label: 'Категории'
                },
            ]
        },
        {
            key: 11,
            label: 'Mini market'
        },
        {
            key: 12,
            label: 'Рассылка'
        },
        {
            key: 13,
            label: 'Шаблоны'
        }
    ]

    const onChangeMenu = (e: {key: string}) => {
        const links = [
            '/admin/orders',
            '/admin/apps',
            '/admin/channels',
            '/admin/products',
            '/admin/stats',
            '/admin/users',
            '/admin/withdraws',
            '/admin/transactions',
            '/admin/designs',
            '/admin/categories',
            '/admin/mini',
            '/admin/messages',
            '/admin/templates'
        ]
        navigate(links[parseInt(e.key) - 1])
    }

    if (user) {
        if (user.is_admin) {
            return (
                <ALayout className="admin-layout"
                        style={{minHeight: "100vh"}}>
                    <Sider theme="light" className="admin-sider" width={297}>
                        <div className="logo">
                            <AdminLogo/>
                        </div>
                        <Menu className="admin-sider-menu" theme="light" mode="inline" items={MenuItems} onClick={onChangeMenu} />
                    </Sider>
                    <ALayout className="site-layout">
                        <Content style={{margin: "0 16px"}}>
                            <Header className="admin-header">
                                <Row align="middle" justify="space-between">
                                    <h2 className="admin-page-title"> {name} </h2>
                                    <div className="d-flex align-center admin-header-right">
                                        <div className="admin-name-text">{user.name}</div>
                                        <Button className="admin-logout" icon={<LogOut/>}
                                                onClick={() => dispatch(logout())}/>
                                    </div>
                                </Row>
                            </Header>
                            <div className="main-content">
                                {props.children}
                            </div>
                        </Content>
                    </ALayout>
                </ALayout>
            );
        } else if (header) {
            return (
                <ALayout style={{minHeight: "100vh"}}>
                    <Header className={"user-header container-xxl"}>
                        <div id="menuToggle" className="mobile-btn" onClick={onClick}>
                            <MenuOutlined/>
                        </div>
                        <div className="left-side">
                            <div className="logo">
                                <AdminLogo/>
                            </div>
                            <ul className="user-ul">
                                <li><Link to="/">Доска заказов</Link></li>
                                <li><Link to="/channels">Мои каналы</Link></li>
                                <li><Link to="/orders">Мои заявки</Link></li>
                                <li><Link to="/balance">Операции с балансом</Link></li>
                                <li><Link to="/rating">Рейтинг</Link></li>
                            </ul>
                        </div>
                        <button className="user-logout"
                                onClick={() => dispatch(logout())}>
                            <LogOut/>
                        </button>
                    </Header>
                    <ul onClick={onClick} className={`mobile-ul ${open ? 'open-menu' : ''}`}>
                        <li><Link to="/">Доска заказов</Link></li>
                        <li><Link to="/channels">Мои каналы</Link></li>
                        <li><Link to="/orders">Мои заявки</Link></li>
                        <li><Link to="/balance">Операции с балансом</Link></li>
                        <li><Link to="/rating">Рейтинг</Link></li>
                    </ul>
                    <Content className="container-xxl content">
                        <div className="site-layout-content"> {props.children} </div>
                    </Content>
                </ALayout>
            );
        } else {
            return (
                <ALayout style={{minHeight: "100vh",}}>
                    <Content className="content">
                        <div className="site-layout-content">
                            {props.children}
                        </div>
                    </Content>
                </ALayout>
            );
        }
    } else {
        return (
            <ALayout style={{minHeight: "100vh",}}>
                <Content className="content">
                    <div className="site-layout-content">
                        {props.children}
                    </div>
                </Content>
            </ALayout>
        );
    }
}

