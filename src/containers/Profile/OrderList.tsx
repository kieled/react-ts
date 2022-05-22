import React, {useEffect, useState} from "react";
import {Button, Row, Col, Form, Select, Modal} from "antd";
import {
    getOrders,
    createOrder,
    getChannelsForOrders,
    load_user,
} from "../../actions/auth";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Flash} from "../../svg/flash.svg";
import {ReactComponent as Chart} from "../../svg/chart.svg";
import IChannel from "../../models/Users/IChannel";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;

const OrderList = () => {
    const {orders, channels} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
    const [selectedChannel, setSelectedChannel] = useState<number | null>(null)
    const [type, setType] = useState<string>('')
    const [typeContent, setTypeContent] = useState<string>('')
    const [moderate, setModerate] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    const [form] = Form.useForm()

    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            document.title = "Доска заказов";
            await dispatch(getOrders(type, typeContent, moderate))
        }

        onLoad().then(() => setIsLoading(false))
    }, [type, typeContent, moderate])

    const onOpenModal = async (e: any, i: number) => {
        dispatch(getChannelsForOrders(i))
        setOpen(true)
        setSelectedOrder(i)
    }

    const onCloseModal = () => {
        form.resetFields();
        setOpen(false)
        setSelectedChannel(null)
    }

    const onFinish = async (e: any) => {
        setOpen(false)
        e.order = selectedOrder;
        e.channel = selectedChannel;
        await dispatch(createOrder(e))
        await dispatch(load_user())
        navigate("/order/" + selectedOrder);
    }

    const onChange = (e: number) => {
        setSelectedChannel(e)
    }

    const onFilterType = (e: string) => {
        setType(e)
    }

    const onFilterTypeContent = (e: string) => {
        setTypeContent(e)
    }

    const onFilterModerate = (e: string) => {
        setModerate(e)
    }

    if (isLoading) {
        return null
    }

    return (
        <>
            <h2 className="title"> Актуальные заказы </h2>
            <div className="main-filters">
                <Select
                    className="dgselect mr-15"
                    placeholder="Тип заказа"
                    onChange={onFilterType}
                    allowClear
                >
                    <Option key="1" value="1">Приоритетный</Option>
                    <Option key="2" value="2">Второстепенный</Option>
                </Select>
                <Select
                    className="dgselect mr-15"
                    placeholder="Тип контента"
                    onChange={onFilterTypeContent}
                    allowClear
                >
                    <Option key="1" value="2">Авторский</Option>
                    <Option key="2" value="1">Шортс</Option>
                </Select>
                <Select
                    className="dgselect"
                    placeholder="Модерация"
                    onChange={onFilterModerate}
                    allowClear
                >
                    <Option key="1" value="1">Быстрая</Option>
                    <Option key="2" value="2">До двух дней</Option>
                </Select>
            </div>
            <Row className="table-rows mobile-hide">
                <Col span={7}>Тип заказа </Col>
                <Col span={4}>Цена за подп. </Col>
                <Col span={4}>Тип контента </Col>
                <Col span={7}>Модерация </Col>
            </Row>
            {orders?.map((item) => {
                return (
                    <Row align="middle" className="order bold-text" key={item.id}>
                        <Col span={1}>

                            {item.type === "1" ? (
                                <div className="thunder">
                                    <Flash/>
                                </div>
                            ) : (
                                <div className="barchart">
                                    <Chart/>
                                </div>
                            )}
                        </Col>
                        <Col span={6} className="main-card-subs">
                            <div className="table-rows"> Кол-во подписчиков</div>
                            {item.name}
                        </Col>
                        <Col span={4}>
                            <div className="table-rows pc-hide">Цена за подписчика</div>
                            {item.price_by_subs} </Col>
                        <Col span={4}>
                            <div className="table-rows pc-hide">Тип контента</div>
                            {item.type_content} </Col>
                        <Col span={6}>
                            <div className="table-rows pc-hide">Тип модерации</div>
                            {item.type === "1" ? "Быстрая" : "До двух дней"}
                        </Col>
                        <Col span={3}>
                            <Button
                                type="primary"
                                className={`${item.type === "1" ? "thunder-button" : "chart-button"} mobile-get-btn`}
                                onClick={(e) => onOpenModal(e, item.id)}
                            >

                                <span className="mobile-hide">Взять заказ</span><span className="pc-hide">Взять</span>
                            </Button>
                        </Col>
                    </Row>
                );
            })}
            <Modal
                centered
                title="Взятие заказа"
                visible={open}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form form={form} onFinish={onFinish}>
                    <p className="modal-text-body">
                        Перед началом выполнения заказа выберите подходящий канал из
                        списка ваших каналов.
                    </p>
                    <Form.Item
                        name="channel"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Выберите канал" onChange={onChange}>
                            {channels.map((channel: IChannel) => {
                                return (
                                    <Option key={channel.id} value={channel.id}>
                                        {channel.name} - {channel.subs} п.
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="green-btn">
                            Начать выполнение
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OrderList
