import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Select, Row, Col, Tabs, TablePaginationConfig} from "antd";
import {
    getMiniOrders, editMiniOrder, createMiniOrder, getValues,
    editValues, getUsdValues, editUsdValues,
} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {EditOutlined, MinusCircleOutlined} from "@ant-design/icons";
import IOrder from "../../models/Admin/IOrder";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;

function MiniMarket() {
    const {mini_orders, values, usd_values, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()
    
    
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number | null>(null)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isValuesModalVisible, setIsValuesModalVisible] = useState(false)
    const [isValuesUsdModalVisible, setIsValuesUsdModalVisible] = useState(false)
    const [isNewModalVisible, setIsNewModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)
    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            await dispatch(getValues())
            await dispatch(getUsdValues())
            dispatch(layoutActions.set_name("Mini market"))
            setIsLoading(true)
            await dispatch(getMiniOrders(filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ filterStatus ])

    const onFinish = async (e: any) => {
        e.is_mini = true
        e.type_mini = "1"
        await dispatch(createMiniOrder(e))
        setIsModalVisible(false)
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const onNewFinish = async (e: any) => {
        e.is_mini = true
        e.type_mini = "2"
        await dispatch(createMiniOrder(e))
        setIsNewModalVisible(false)
    }

    const onValuesFinish = async (e: any) => {
        await dispatch(editValues(e))
        setIsValuesModalVisible(false)
    }

    const onUsdValuesFinish = async (e: any) => {
        await dispatch(editUsdValues(e))
        setIsValuesUsdModalVisible(false)
    }

    const onEdit = async (e: any) => {
        e.id = mini_orders[uid || 0].id;
        if (e.max_count_subs === "") {
            e.max_count_subs = null
        }
        if (e.min_count_subs === "") {
            e.min_count_subs = null
        }
        await dispatch(editMiniOrder(e))
        setIsEditModalVisible(false)
    }

    const onStatusChange = async (e: any, id: number) => {
        await dispatch(editMiniOrder({id: id, status: e}))
    }

    const onEditModal = (id: number) => {
        setUid(mini_orders.findIndex((order: IOrder) => order.id === id))
        setIsEditModalVisible(true)
        form.resetFields();
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('1')
        } else if (id === '3') {
            setFilterStatus('2')
        }
    }

    const getStatusClass = (id: number) => {
        const status = parseInt(mini_orders.find((order: IOrder) => order.id === id)?.status || '0');
        if (status === 1) {
            return "admin-mini-status-active";
        } else if (status === 5) {
            return "admin-mini-status-deactive";
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 100,
        },
        {
            title: "Тип",
            dataIndex: "type_mini",
            key: "type_mini",
            width: 150,
            render: (item: string) => <> {item === "1" ? "Оптовый" : "Розничный"} </>,
        },
        {
            title: "Кол-во подписчиков",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Передача",
            dataIndex: "type_transfer",
            key: "type_transfer",
            render: (item: string) => <> {item === "1" ? "аккаунт" : "бренд"} </>,
        },
        {
            title: "Тип контента",
            dataIndex: "type_content",
            key: "type_content",
            render: (item: string) => <> {item === "1" ? "шортс" : "авторский"} </>,
        },
        {
            title: "Цена",
            dataIndex: "price_by_channel",
            key: "price_by_channel",
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <Select placeholder="Статус"
                            className={`admin-mini-status ${getStatusClass(id)}`}
                            value={mini_orders.find((order: IOrder) => order.id === id)?.status}
                            onChange={(e) => onStatusChange(e, id)}>
                        <Option value="1"> На продаже </Option>
                        <Option value="5"> Неактивно </Option>
                    </Select>
                    <button className="admin-action-btn" onClick={() => onEditModal(id)}>
                        <EditOutlined/>
                    </button>
                </div>
            )
        },
    ];
    const TableBody = (item = "") => {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Тип товара</div>
                        <Form.Item name="type" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип товара">
                                <Option value="1"> Приоритетный </Option>
                                <Option value="2"> Второстепенный </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Кол-во подписчиков</div>
                        <Row>
                            <Col span={12}>
                                <Form.Item className="admin-input first-column-table"
                                           name="min_count_subs">
                                    <Input placeholder="От"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className="admin-input first-column-table"
                                           name="max_count_subs">
                                    <Input placeholder="До"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Количество каналов</div>
                        <Form.Item
                            className="admin-input"
                            name="count"
                            rules={[{required: true,},]}>
                            <Input placeholder="Введите число"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Тип передачи</div>
                        <Form.Item className="first-column-table"
                                   name="type_transfer" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип передачи">
                                <Option value="1">аккаунт</Option>
                                <Option value="2">бренд</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Тип контента</div>
                        <Form.Item
                            name="type_content" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип контента">
                                <Option value="1"> Шортс </Option>
                                <Option value="2"> Авторский </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость</div>
                        <Form.Item className="admin-input first-column-table"
                                   name="price_by_channel" rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость $</div>
                        <Form.Item className="admin-input first-column-table"
                                   name="price_usd" rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость $"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        {item}
                    </Button>
                </Form.Item>
            </>
        );
    };
    const ListFormBody = (text: string) => {
        return (
            <>
                <Form.List name={text}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Row key={key}>
                                    <Col span={12}>
                                        <div className="admin-label"> Кол - во подписчиков</div>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, "min"]}
                                                           rules={[{required: true}]}
                                                           className="admin-input first-column-table">
                                                    <Input placeholder="От"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, "max"]}
                                                           rules={[{required: true}]}
                                                           className="admin-input first-column-table">
                                                    <Input placeholder="До"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={11}>
                                        <div className="admin-label"> Цена</div>
                                        <Form.Item {...restField} name={[name, "price"]}
                                                   rules={[{required: true}]} className="admin-input">
                                            <Input placeholder="Введите цену"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        <MinusCircleOutlined className="admin-minus-btn-editor"
                                                             onClick={() => remove(name)}/>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col span={6}>
                                    <Form.Item className="justify-content-start">
                                        <Button className="admin-add-new-editor-price"
                                              onClick={() => add()}>
                                            Добавить фильтр
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </>
        );
    };

    return (
        <>
            <Row>
                    <button className="admin-mini-btn-editor-prices" onClick={() =>
                        setIsModalVisible(true)}>
                        Новый оптовый заказ
                    </button>
                    <button className="admin-mini-btn-editor-prices"
                            onClick={() => setIsNewModalVisible(true)}>
                        Новый розничный заказ
                    </button>
                    <button className="admin-mini-btn-editor-prices"
                            onClick={() => setIsValuesModalVisible(true)}>
                        Редактор цен
                    </button>
                    <button
                        className="admin-mini-btn-editor-prices"
                        onClick={() => setIsValuesUsdModalVisible(true)}>
                        $ Редактор цен $
                    </button>
            </Row>
            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все заявки" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="Оптовые" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Розничные" key="3"> </Tabs.TabPane>
            </Tabs>

            <Table sticky={true} columns={columns}
                   rowKey={item => item.id}
                   dataSource={mini_orders}
                   loading={isLoading}
                   pagination={{current: current, pageSize: 10, total: count}}
                   onChange={onPaginate}
            />



            <Modal centered className="admin-modal" width={751} title="Создание заказа"
                   visible={isModalVisible} footer={null}
                   onCancel={() => setIsModalVisible(false)}>
                <Form name="create-order" onFinish={onFinish}>
                    {TableBody("Добавить")}
                </Form>
            </Modal>
            <Modal centered className="admin-modal" width={751} title="Редактирование товара"
                   visible={isEditModalVisible} footer={null}
                   onCancel={() => setIsEditModalVisible(false)}>
                <Form form={form} name="edit-order" onFinish={onEdit}
                      initialValues={uid !== null ? mini_orders[uid] : undefined}>
                    {TableBody("Сохранить")}
                </Form>
            </Modal>
            <Modal centered className="admin-modal" width={751} title="Создание розничного заказа"
                   visible={isNewModalVisible} footer={null}
                   onCancel={() => setIsNewModalVisible(false)}>
                <Form form={form} name="new-r-order" onFinish={onNewFinish}>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Тип товара</div>
                            <Form.Item name="type"
                                       rules={[{required: true}]}>
                                <Select className="admin-select" placeholder="Выберите тип товара">
                                    <Option value="1"> Приоритетный </Option>
                                    <Option value="2"> Второстепенный </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Ссылка на канал</div>
                            <Form.Item className="admin-input first-column-table" name="url"
                                       rules={[{required: true,},]}>
                                <Input placeholder="Ссылка на канал"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Стоимость</div>
                            <Form.Item className="admin-input" name="price_by_channel"
                                       rules={[{required: true}]}>
                                <Input placeholder="Введите стоимость"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Тип передачи</div>
                            <Form.Item className="first-column-table" name="type_transfer"
                                       rules={[{required: true}]}>
                                <Select className="admin-select" placeholder="Выберите тип передачи">
                                    <Option value="1"> аккаунт </Option>
                                    <Option value="2"> бренд </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Тип контента</div>
                            <Form.Item
                                name="type_content" rules={[{required: true}]}>
                                <Select className="admin-select" placeholder="Выберите тип контента">
                                    <Option value="1"> Шортс </Option>
                                    <Option value="2"> Авторский </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Стоимость $</div>
                            <Form.Item className="admin-input" name="price_usd"
                                       rules={[{required: true}]}>
                                <Input placeholder="Введите стоимость $"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit" type="primary" htmlType="submit">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal centered className="admin-modal" width={664} title="Редактор цен"
                   visible={isValuesModalVisible} footer={null}
                   onCancel={() => setIsValuesModalVisible(false)}>
                <Form name="edit-values" onFinish={onValuesFinish}
                      autoComplete="off" initialValues={{values}}>
                    {ListFormBody("values")}
                </Form>
            </Modal>
            <Modal centered className="admin-modal" width={664} title="Редактор цен $"
                   visible={isValuesUsdModalVisible} footer={null}
                   onCancel={() => setIsValuesUsdModalVisible(false)}>
                <Form name="edit-values-dollar" onFinish={onUsdValuesFinish} autoComplete="off"
                      initialValues={{usd_values}}>
                    {ListFormBody("usd_values")}
                </Form>
            </Modal>
        </>
    );
}

export default MiniMarket