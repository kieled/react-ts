import React, {useEffect, useState} from "react";
import {Button, Row, Col} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {Tabs} from "antd";
import {
    acceptOrder,
    cancelOrder,
    load_user,
    expiredOrder,
} from "../../actions/auth";
import {YoutubeFilled} from "@ant-design/icons";
import {ReactComponent as Success} from "../../svg/status-success.svg";
import {ReactComponent as Error} from "../../svg/status-error.svg";
import {ReactComponent as Moderate} from "../../svg/status-moderate.svg";
import {ReactComponent as Process} from "../../svg/status-process.svg";
import IOrder from "../../models/Users/IOrder";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {TabPane} = Tabs;

const MyOrders = () => {
    const {user_orders} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()


    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            document.title = "Мои заявки";
            await dispatch(expiredOrder())
            await dispatch(load_user())
        }
        
        onLoad().then(() => setIsLoading(false))
    }, [  ])

    const onAccept = async(id: number) => {
        await acceptOrder(id);
        navigate("/order/" + id);
    }

        const getChannelStatus = (id: number) => {
            if (id === 4) {
                return "Выполнено";
            } else if (id === 5) {
                return "Отклонено";
            } else if (id === 6) {
                return "Просрочено";
            }
        };

        const getOrderStatus = (id: number) => {
            if (id === 4) {
                return "Выполнена. Деньги зачислены на баланс.";
            } else if (id === 2) {
                return "В работе. Ожидает продолжение выполнения.";
            } else if (id === 3) {
                return "Проходит модерацию.";
            } else if (id === 5) {
                return "Отклонена.";
            }
        };

        const getIconStatus = (id: number) => {
            if (id === 4) {
                return <Success/>;
            } else if (id === 2) {
                return <Process/>;
            } else if (id === 3) {
                return <Moderate/>;
            } else if (id === 5) {
                return <Error/>;
            }
        };

        const getCardBodyClass = (id: number) => {
            if (id === 4) {
                return "order-body-success";
            } else if (id === 2) {
                return "order-body-process";
            } else if (id === 3) {
                return "order-body-moderate";
            } else if (id === 5) {
                return "order-body-canceled";
            }
        };

        const getCardIconClass = (id: number) => {
            if (id === 4) {
                return "order-icon-success";
            } else if (id === 2) {
                return "order-icon-process";
            } else if (id === 3) {
                return "order-icon-moderate";
            } else if (id === 5) {
                return "order-icon-canceled";
            }
        };

        const getCardOrderClass = (id: number) => {
            if (id === 4) {
                return "order-card-success";
            } else if (id === 2) {
                return "order-card-process";
            } else if (id === 3) {
                return "order-card-moderate";
            } else if (id === 5) {
                return "order-card-canceled";
            }
        };

        const getCardYTClass = (id: number) => {
            if (id === 4) {
                return "yt-card-success";
            } else if (id === 1) {
                return "yt-card-process";
            } else if (id === 6) {
                return "yt-card-expired";
            } else if (id === 5) {
                return "yt-card-canceled";
            }
        };

        const getBtnYTClass = (id: number) => {
            if (id === 6) {
                return "expired-yt-btn";
            } else if (id === 5) {
                return "canceled-yt-btn";
            } else if (id === 4) {
                return "success-yt-btn";
            }
        };

        const getYTIconClass = (id: number) => {
            if (id === 6) {
                return "expired-yt-icon";
            } else if (id === 5) {
                return "canceled-yt-icon";
            } else if (id === 4) {
                return "success-yt-icon";
            } else if (id === 1) {
                return "process-yt-icon";
            }
        };

        if (isLoading) {
            return null
        }

        return (
            <>
                <Tabs defaultActiveKey="1" size="large" className="admin-apps-tabs mobile-tabs-orders">
                    <TabPane tab="Мои заявки" key="1">
                        <Row gutter={[16, 16]} align={"middle"} className="order-mobile-card-row">
                            {user_orders
                                .filter((order: IOrder) => order.type !== "3" && order.type !== "4")
                                .map((item: IOrder) => {
                                    if (item.status === "2") {
                                        return (
                                            <Col span={12} key={item.id}>
                                                <Link to={`/order/${item.id}`}>
                                                    <Row
                                                        align={"middle"}
                                                        className={`order-card ${getCardOrderClass(
                                                            parseInt(item.status)
                                                        )}`}
                                                    >
                                                        <div
                                                            className={`order-card-body ${getCardBodyClass(
                                                                parseInt(item.status))}`}>
                                                            <Col span={2}>
                                                                <div
                                                                    className={`order-icon ${getCardIconClass(
                                                                        parseInt(item.status))}`}>
                                                                    {getIconStatus(parseInt(item.status))}
                                                                </div>
                                                            </Col>
                                                            <Col span={21} className="ml10">
                                                                <div className="order-title">
                                                                    Заявка# {item.id}
                                                                </div>
                                                                <div className="order-card-status">
                                                                    Статус: {getOrderStatus(
                                                                        parseInt(item.status
                                                                        ))}
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    </Row>
                                                </Link>
                                            </Col>
                                        );
                                    } else {
                                        return (
                                            <Col span={12} key={item.id}>
                                                <Row
                                                    align={"middle"}
                                                    className={`order-card ${getCardOrderClass(
                                                        parseInt(item.status))}`}
                                                >
                                                    <div
                                                        className={`order-card-body ${getCardBodyClass(
                                                            parseInt(item.status)
                                                        )}`}
                                                    >
                                                        <Col span={2}>
                                                            <div
                                                                className={`order-icon ${getCardIconClass(
                                                                    parseInt(item.status)
                                                                )}`}
                                                            >

                                                                {getIconStatus(parseInt(item.status))}
                                                            </div>
                                                        </Col>
                                                        <Col span={21} className="ml10">
                                                            <div className="order-title">

                                                                Заявка# {item.id}
                                                            </div>
                                                            <div className="order-card-status">

                                                                Статус: {getOrderStatus(parseInt(item.status))}
                                                                {item.status === "5"
                                                                    ? `Причина: ${
                                                                        item.comment !== null
                                                                            ? item.comment
                                                                            : "Отмена заказа"
                                                                    }`
                                                                    : ""}
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </Row>
                                            </Col>
                                        );
                                    }
                                })}
                        </Row>
                    </TabPane>
                    <TabPane tab="Запросы на покупку" key="2">

                        {user_orders
                            .filter((order: IOrder) => order.type === "3")
                            .map((item: IOrder) => {
                                return (
                                    <Row key={item.id}>
                                        <Col span={22}>
                                            <Row
                                                align="middle"
                                                className={`yt-card ${getCardYTClass(parseInt(item.status))}`}
                                            >
                                                <Col span={1} className="ml-15px">
                                                    <YoutubeFilled
                                                        className={getYTIconClass(parseInt(item.status))}
                                                        style={{
                                                            fontSize: "44px",
                                                        }}
                                                    />
                                                </Col>
                                                <Col span={3} className="ml20">
                                                    <div> Название</div>
                                                    <div className="bold-text"> {item.channel?.name} </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div> Аудитория</div>
                                                    <div className="bold-text"> {item.channel?.subs} </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div> Контент</div>
                                                    <div className="bold-text"> {item.type_content} </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div> Сумма</div>
                                                    <div className="bold-text">

                                                        {item.price_by_channel}₽
                                                    </div>
                                                </Col>
                                                <Col span={3}>
                                                    <a className="yt-link" href={item.channel?.url}>

                                                        открыть канал
                                                    </a>
                                                </Col>
                                                <Col span={3}>

                                                    {item.status === "1" ? (
                                                        <Button
                                                            className="cancel-yt-btn"
                                                            onClick={() => cancelOrder(item.id)}
                                                        >
                                                            <div className="white-status-text">

                                                                Отклонить
                                                            </div>
                                                        </Button>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Col>
                                                <Col span={3} className="ml10">

                                                    {item.status === "1" ? (
                                                        <Button
                                                            className="agree-yt-btn"
                                                            onClick={() => onAccept(item.id)}
                                                        >

                                                            Принять
                                                        </Button>
                                                    ) : (
                                                        <Button className={getBtnYTClass(parseInt(item.status))}>
                                                            <div className="white-status-text">

                                                                {getChannelStatus(parseInt(item.status))}
                                                            </div>
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                );
                            })}
                    </TabPane>
                </Tabs>
            </>
        );
}

export default MyOrders
