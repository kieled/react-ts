import React, {useEffect, useState} from "react";
import {Button, Row, Col, Divider, Switch, Statistic} from "antd";
import {getOrder, cancelOrder, confirmOrder} from "../../actions/auth";
import {useNavigate, useParams} from "react-router-dom";
import "../../css/order_view.css";

import {ReactComponent as Star} from "../../svg/star.svg";
import {ReactComponent as Clock} from "../../svg/clock.svg";
import {ReactComponent as Bell} from "../../svg/bell.svg";
import {ReactComponent as Alert} from "../../svg/alert.svg";
import {ReactComponent as Info} from "../../svg/info.svg";
import {ReactComponent as Flash} from "../../svg/flash.svg";
import {useAppDispatch, useAppSelector} from "../../hooks";


const OrderView = () => {
    const {order} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [id, setId] = useState<number | null>(null)
    const [firstSwitch, setFirstSwitch] = useState(false)
    const [secondSwitch, setSecondSwitch] = useState(false)
    const [allow, setAllow] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const {orderId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            setId(parseInt(orderId || '0'))
            await getOrder(id || 0);
            if (!order?.time_expired) {
                navigate("/orders");
            }
            document.title = "Заявка #" + id;
        }

        onLoad().then(() => setIsLoading(false))
    }, [  ])

    const onCancelClick = async () => {
        await dispatch(cancelOrder(id || 0))
        navigate("/orders");
    }

    const onConfirmClick = async () => {
        await dispatch(confirmOrder(id || 0))
        navigate("/orders");
    }

    const changeSwitch = async (e: any, id: number) => {
        if (id === 1) {
            setFirstSwitch(e)
        } else {
            setSecondSwitch(e)
        }
        if (firstSwitch && secondSwitch) {
            setAllow(false)
        } else {
            setAllow(true)
        }
    }

    const onExpired = () => {
        navigate("/orders");
    }

    const getButtonClass = () => {
        if (!allow) {
            return "btn-active";
        } else {
            return "";
        }
    };

    const getButtonClassWithoutDesign = () => {
        if (secondSwitch) {
            return "btn-active";
        } else {
            return "";
        }
    };

    if (isLoading) {
        return null
    }
    return (
        <>
            <Row>
                <Col span={17} className="left-side-order-view">
                    <Row align="middle" className="row-order-name">
                        <Col span={10}>
                            <h2 className="order-id">
                                Выполнение заказа# {order?.id}
                            </h2>
                        </Col>
                        <Col span={13} className="content-right">
                            <Col span={11} className="content-right">
                                <a href={order?.channel_url} target="_blank" rel="noreferrer">
                                    <button className="order-view-btn mr-2 open-channel-btn">
                                        Открыть канал
                                    </button>
                                </a>
                            </Col>


                            {order?.is_request === true ? '' : (
                                <Col span={13} className="content-right">
                                    <button className="order-view-btn" onClick={() => onCancelClick()}>
                                        Отказаться от заказа
                                    </button>
                                </Col>
                            )}

                        </Col>
                    </Row>
                    {order?.design !== null ? (
                        <Row>
                            <div className="step-text">Этап 1 | Смена тематики канала</div>
                            <div className="text">
                                <Bell className="text-icon"/> Скачайте пак с дизайном для
                                вашего канала, смените оформление и поменяйте название.
                            </div>
                            {order?.type_content === "2" ? (
                                <div className="d-flex">
                                    <div>
                                        <Alert className="text-icon"/>
                                    </div>
                                    <div className="text">
                                        Внимание!У данного заказа - тип контента“ Авторский”.Для
                                        правильного выполнения заказа прочтите нашу статью об
                                        авторсом контенте для каналов - Читать инструкцию
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={order?.design?.url}
                                >

                                    <button className="download-btn">

                                        Скачать оформление
                                    </button>
                                </a>
                            </div>
                            <div>
                                <Switch
                                    className="mr-13"
                                    onChange={(e) => () => changeSwitch(e, 1)}
                                />
                                Я поменял название и оформление канала(доп: загрузил авторский
                                контент)
                            </div>
                            <Divider className="divider"/>
                        </Row>
                    ) : (
                        ""
                    )}
                    <Row>
                        <Col span={24}>
                            <div className="step-text">

                                Этап {order?.design !== null ? "2" : "1"} | Передача
                                прав владельца
                            </div>
                            <div className="d-flex align-center text">
                                <div>
                                    <Info className="text-icon"/>
                                </div>
                                <div>
                                    <a
                                        href="https://vk.com/@dg.work-sozdanie-akkaunta-brenda"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text_underline"
                                    >

                                        Подробная информация о создании аккаунта бренда и передачи
                                        прав владельца.
                                    </a>
                                </div>
                            </div>
                            <div className="email-text">

                                Передайте права владельца на почту:
                                <div className="bold-text detail-view-email">

                                    {order?.email}
                                </div>
                            </div>
                            <Row>
                                <Col span={14}>
                                    <p>

                                        <Switch className="mr-13"
                                            onChange={(e) => () => changeSwitch(e, 2)}/>
                                        Я передал права владельца на указанную почту
                                    </p>
                                </Col>
                            </Row>
                            <Row className="row-order-moderate">
                                <Col span={6} className="content-right">

                                    {order?.design !== null ? (
                                        <Button
                                            className={`order-view-btn ${getButtonClass()}`}
                                            disabled={allow}
                                            onClick={() => onConfirmClick()}
                                        >

                                            Отправить на модерацию
                                        </Button>
                                    ) : (
                                        <Button
                                            className={`order-view-btn ${getButtonClassWithoutDesign()}`}
                                            disabled={!secondSwitch}
                                            onClick={() => onConfirmClick()}
                                        >

                                            Отправить на модерацию
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <div className="info-yt-card">
                        <div className="info-yt-card-title"> Параметры заказа</div>
                        <Row className="justify-content-between">
                            <Col span={5}>
                                <div className="icon-block">
                                    <Flash className="icon-stats"/>
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="subs-text">
                                    <div className="grey-text"> Кол - во подписчиков</div>
                                    <div className="value-text">

                                        {order?.name === "None+"
                                            ? "-"
                                            : order?.name}
                                    </div>
                                </div>
                                <div className="subs-price">
                                    <div className="grey-text"> Цена за подп</div>
                                    <div className="value-text">

                                        {order?.price_by_subs === null
                                            ? "-"
                                            : order?.price_by_subs}
                                    </div>
                                </div>
                                <div className="type-content">
                                    <div className="grey-text"> Тип контента</div>
                                    <div className="value-text">

                                        {order?.type_content === "2"
                                            ? "авторский"
                                            : "шортс"}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col span={5}>
                                <div className="icon-block bonus">
                                    <Star/>
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="bonus-text">
                                    <div className="grey-text"> Бонус за контент</div>
                                    <div className="value-text">

                                        {order?.bonus === "0.000"
                                            ? "-"
                                            : order?.bonus}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-center justify-content-between">
                            <Col span={5}>
                                <div className="icon-block timer">
                                    <Clock/>
                                </div>
                            </Col>
                            <Col span={19} className="align-center">
                                <div className="timer-text">
                                    <Statistic.Countdown
                                        title="Времени на выполнение"
                                        value={order?.time_expired}
                                        onFinish={onExpired}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="info-yt-card">
                        <div className="info-yt-card-title mn">

                            Рассчетная стоимость
                        </div>
                        <div className="d-flex total-price">

                            {order?.price_by_channel}
                            <div className="rubles"> ₽</div>
                        </div>
                        <div className="price-dr">

                            Удержание суммы после выполнения до 7 дней
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default OrderView
