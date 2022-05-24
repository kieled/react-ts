import React, {useEffect, useState} from "react"
import {Row, Col, Form, Select} from "antd"
import {
    getOrders,
    createOrder,
    getChannelsForOrders,
    load_user,
} from "../../../actions/auth"
import {useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import PickOrderModal from "./PickOrderModal"
import OrderItem from "./OrderItem";


const {Option} = Select

const OrderList = () => {
    const {orders, channels} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [openModal, setOpenModal] = useState(false)
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
            document.title = "Доска заказов"
            await dispatch(getOrders(type, typeContent, moderate))
        }

        onLoad().then(() => setIsLoading(false))
    }, [type, typeContent, moderate])

    const onOpenModal = async (i: number) => {
        dispatch(getChannelsForOrders(i))
        setOpenModal(true)
        setSelectedOrder(i)
    }

    const onCloseModal = () => {
        form.resetFields()
        setOpenModal(false)
        setSelectedChannel(null)
    }

    const onFinish = async (e: any) => {
        setOpenModal(false)
        e.order = selectedOrder
        e.channel = selectedChannel
        await dispatch(createOrder(e))
        await dispatch(load_user())
        navigate("/order/" + selectedOrder)
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
            {!isLoading && orders?.map((item) => {
                return (
                    <OrderItem item={item}
                               onOpenModal={onOpenModal} />
                )
            })}
            <PickOrderModal openModal={openModal} 
                            closeModal={onCloseModal} 
                            form={form} 
                            onFinish={onFinish} 
                            onChange={onChange} 
                            channels={channels} 
            />
        </>
    )
}

export default OrderList
