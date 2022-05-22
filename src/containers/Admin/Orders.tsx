import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Select, Divider, Row, Col} from "antd";
import {getOrders, deleteOrders, getActualDesigns, createOrder, editOrder} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import "../../css/admin.css";
import IOrder from "../../models/Admin/IOrder";
import {useAppDispatch, useAppSelector} from "../../hooks";
import IActualDesigns from "../../models/Admin/IActualDesigns";


const {Option} = Select;

function Orders() {
    const {orders, actualDesigns} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [order, setOrder] = useState<IOrder | undefined>(undefined)
    const [btnLoading, setBtnLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            dispatch(layoutActions.set_name('Заказы'))
            setIsLoading(true)
            await dispatch(getOrders())
            setIsLoading(false)
            await dispatch(getActualDesigns())
        }

        onLoad().then(null)
    }, [  ])

    const onFinish = async (e: IOrder) => {
        setBtnLoading(true)
        await dispatch(createOrder(e))
        setBtnLoading(false)
        setIsModalVisible(false)
        await dispatch(getActualDesigns())
    }

    const onEdit = async (e: any) => {
        e.id = order?.id
        if (e.max_count_subs === '') {
            e.max_count_subs = null
        }
        if (e.min_count_subs === '') {
            e.min_count_subs = null
        }
        await dispatch(editOrder(e))
        await dispatch(getOrders())
        setIsEditModalVisible(false)
    }

    const onDelete = async (id: number) => {
        await dispatch(deleteOrders(id))
        await dispatch(getActualDesigns())
    }

    const onEditModal = async (id: number) => {
        setOrder(orders?.find((order: IOrder) => order.id === id))
        setIsEditModalVisible(true)
        form.resetFields()

    }

        const FormBody = (text:string) => {
            return (<>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label">Тип заказа</div>
                            <Form.Item name="type"
                                       rules={[{required: true, message: 'Выберите тип заказа'}]}>
                                <Select className="admin-select" placeholder="Выберите тип заказа">
                                    <Option value="1">Приоритетный</Option>
                                    <Option value="2">Второстепенный</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label">Кол-во подписчиков</div>
                            <Row className="align-items-end">
                                <Col span={11}>
                                    <Form.Item className="admin-input"
                                               name="min_count_subs">
                                        <Input placeholder="От"/>
                                    </Form.Item> </Col>
                                <Col span={11} offset={1}>
                                    <Form.Item className="admin-input" name="max_count_subs">
                                        <Input placeholder="До"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label">Время на выполнение</div>
                            <Form.Item name="time_to_do"
                                       rules={[{required: true, message: 'Выберите время выполнения'}]}>
                                <Select className="admin-select" placeholder="Выберите срок">
                                    <Option value="1"> 1 час </Option>
                                    <Option value="6"> 6 часов </Option>
                                    <Option value="24"> 24 часа </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Цена за подписчика</div>
                            <Form.Item name="price_by_subs" className="first-column-table admin-input"
                                       rules={[{required: true}]}>
                                <Input placeholder="Введите цену за подписчика"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Тип контента</div>
                            <Form.Item name="type_content" rules={[{required: true, message: 'Выберите тип контента'}]}>
                                <Select className="admin-select"
                                        placeholder="Выберите тип контента">
                                    <Option value="1"> Шортс </Option>
                                    <Option value="2"> Авторский </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label">Модерация</div>
                            <Form.Item name="moderation" className="first-column-table"
                                       rules={[{required: true, message: 'Выберите тип модерации'}]}>
                                <Select className="admin-select" placeholder="Выберите тип модерации">
                                    <Option value="1"> Быстрая </Option>
                                    <Option value="2"> До двух дней </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label">Почта для передачи прав владельца</div>
                            <Form.Item className="admin-input" name="email"
                                       rules={[{required: true, message: 'Введите адрес почты'}]}>
                                <Input placeholder="Введите адрес почты"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label">Оформление</div>
                            <Form.Item name="design" className="first-column-table">
                                <Select className="admin-select" placeholder="Выберите категорию">
                                    {actualDesigns?.map((design: IActualDesigns) => {
                                        return <Option key={design.id} value={design.id}>
                                            {design.category} {design.id}
                                        </Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label">Бонус за выполнение</div>
                            <Form.Item className="admin-input" name="bonus">
                                <Input placeholder="Только для авторского контента*"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className="form-btn">
                        <Button loading={btnLoading} className="green-btn-submit"
                                type="primary" htmlType="submit"> {text}
                        </Button>
                    </Form.Item>
                </>
            )
        }

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Дата создания',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Кол-во подписчиков',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '',
                dataIndex: 'id',
                key: 'x',
                render: (id: number) =>
                    <>
                        <Button className="admin-action-btn"
                                icon={< EditOutlined/>} onClick={() => onEditModal(id)}/> <
                        Button className="admin-action-btn"
                               icon={< DeleteOutlined/>} onClick={() => onDelete(id)}/>
                    </>,
            },
        ];

        return (
            <>
                <Button className="new-order-btn" onClick={() => setIsModalVisible(true)}>
                    Новый заказ
                </Button>
                <div className="orders-title"> Все заказы({orders?.length})</div>
                <Divider className="admin-divider"/>
                <Modal centered className="admin-modal"
                       width={751} title="Создание заказа"
                       visible={isModalVisible} footer={null}
                       onCancel={() => setIsModalVisible(false)}>
                    <Form requiredMark={false} name="create-order" onFinish={onFinish}>
                        {FormBody('Создать')}
                    </Form>
                </Modal>
                <Modal centered className="admin-modal" width={751} title="Редактирование заказа"
                       visible={isEditModalVisible} footer={null}
                       onCancel={() => setIsEditModalVisible(false)}>
                    <Form requiredMark={false} form={form} name="edit-order" onFinish={onEdit}
                          initialValues={{
                                  type: order?.type,
                                  min_count_subs: order?.min_count_subs,
                                  max_count_subs: order?.max_count_subs,
                                  price_by_subs: order?.price_by_subs,
                                  moderation: order?.moderation,
                                  email: order?.email,
                                  time_to_do: order?.time_to_do?.toString(),
                                  type_content: order?.type_content,
                                  design: order?.design?.toString(),
                                  bonus: order?.bonus
                              }}>
                        {FormBody('Сохранить')}
                    </Form>
                </Modal>
                <Table className="order-table" sticky={true} columns={columns}
                       rowKey={item => item.id} dataSource={orders} loading={isLoading}/>
            </>
        )
}

export default Orders