import React, {useEffect, useState} from "react";
import {editProduct, getOurChannels, createChannel, getWorkers,} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {Button, Select, Table, Modal, Form, Input, Typography, Row, Col, Tabs, TablePaginationConfig,} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import IChannel from "../../models/Admin/IChannel";
import IWorkers from "../../models/Admin/IWorkers";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;
const {Paragraph} = Typography;
const {Search} = Input;

const Products = () => {
    const {workers, our_channels, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isNewModalVisible, setIsNewModalVisible] = useState(false)
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [id, setId] = useState<number | null>(null)
    const [uid, setUid] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterSearch, setFilterSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)

    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления";
            await dispatch(getWorkers())
            await dispatch(layoutActions.set_name("Товары"))
            setIsLoading(true)
            await dispatch(getOurChannels(filterSearch, filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ filterSearch, filterStatus, current ])

    const onStatusChange = async (e: number, id: number) => {
        if (e === 2) {
            setId(id)
            setIsStatusModalVisible(true)
        } else {
            const data = {id: id, status: e}
            await dispatch(editProduct(data))
        }
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else {
            setFilterStatus(`${parseInt(id) - 1}`)
        }
    }

    const onOpenModal = async (id: number) => {
        const uid = our_channels?.findIndex(((obj) => obj.id === id)) || null
        setId(id)
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields();
    }

    const onNewFinish = async (e: any) => {
        await dispatch(createChannel(e))
        setIsNewModalVisible(false)
    }

    const onEditFinish = async (e: any) => {
        e.id = id;
        await dispatch(editProduct(e))
        setIsEditModalVisible(false)
    }

    const onSellFinish = async (e: any) => {
        e.id = id;
        e.status = "2";
        await dispatch(editProduct(e))
        setIsStatusModalVisible(false)
    }

    const onExpensesChange = async (e: any, id: number) => {
        const data = {
            id: id,
            expenses: e,
        };
        await dispatch(editProduct(data))
    }

    const onIDFilter = (e: string) => {
        setFilterSearch(e)
    }

    const getStatusByID = (id: number) => {
        return our_channels.find((item: IChannel) => item.id === id)?.status;
    };

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const getStatusClass = (id: number) => {
        const status = getStatusByID(id);
        if (status === "1") {
            return "admin-status-status-btn-proccess";
        } else if (status === "2") {
            return "admin-status-status-btn-success";
        } else if (status === "3") {
            return "admin-status-status-btn-archive";
        } else if (status === "4") {
            return "admin-status-status-btn-waiting";
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "ЗС",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "РНТ",
            dataIndex: "id",
            key: "expenses",
            render: (id: number) => {
                try {
                    return (
                        <Paragraph editable={{onChange: (e) => onExpensesChange(e, id)}}>
                            {our_channels.find((channel: IChannel) => channel.id === id)?.expenses}
                        </Paragraph>
                    );
                } catch (err) {
                    return null;
                }
            },
        },
        {
            title: "Продажа",
            dataIndex: "price_sell",
            key: "price_sell",
            render: (item: string | undefined) => <> {item ? item : '-'} </>
        },
        {
            title: "ЧП",
            dataIndex: "profit",
            key: "profit",
        },
        {
            title: "Дата покупки",
            dataIndex: "date_buy",
            key: "date_buy",
        },
        {
            title: "Дата продажи",
            dataIndex: "date_sell",
            key: "date_sell",
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => {
                try {
                    return (
                        <div className="admin-action-buttons">
                            <button className="admin-products-btn-info"
                                    onClick={() => onOpenModal(id)}>
                                <InfoCircleOutlined/>
                            </button>
                            <Select placeholder="Статус"
                                    className={`admin-products-status-btn ${getStatusClass(id)}`}
                                    value={our_channels.find((channel: IChannel) => channel.id === id)?.status}
                                    onChange={(e) => onStatusChange(parseInt(e), id)}>
                                <Option value="1"> В продаже </Option>
                                <Option value="2"> Продан </Option>
                                <Option value="3"> В архиве </Option>
                                <Option value="4"> Ожидает публикации </Option>
                            </Select>
                        </div>
                    );
                } catch (err) {
                    return null;
                }
            }
        },
    ];
    return (
        <>
            <Row>
                    <Button className="new-order-btn"
                            onClick={() => setIsNewModalVisible(true)}>
                        Новый товар
                    </Button>
                    <Search className="admin-channels-search m0 mb-3"
                            placeholder="Введите ID или название канала" onSearch={onIDFilter}/>
            </Row>
            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все товары" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="В продаже" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Проданные" key="3"> </Tabs.TabPane>
                <Tabs.TabPane tab="Архив" key="4"> </Tabs.TabPane>
                <Tabs.TabPane tab="Ожидают публикации" key="5"> </Tabs.TabPane>
            </Tabs>


                <Table
                    pagination={{current: current, pageSize: 10, total: count}}

                    sticky={true}
                    rowKey={item => item.id}
                    dataSource={our_channels}
                    columns={columns}
                    loading={isLoading}
                    onChange={onPaginate}
                />
            <Modal
                width={751}
                className="admin-modal"
                title="Новый товар"
                visible={isNewModalVisible}
                onCancel={() => setIsNewModalVisible(false)}
                footer={null}
            >
                <Form name="new-channel" onFinish={onNewFinish}>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Ссылка на канал</div>
                            <Form.Item className="admin-input" name="url" rules={[{required: true}]}>
                                <Input placeholder="введите ссылку на канал"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> ЗС</div>
                            <Form.Item
                                className="admin-input first-column-table"
                                name="price"
                                rules={[{required: true}]}
                            >
                                <Input placeholder="сумма"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> РНТ</div>
                            <Form.Item name="expenses" className="admin-input">
                                <Input placeholder="сумма"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Дата покупки</div>
                            <Form.Item name="date_buy"
                                       className="admin-input first-column-table">
                                <Input placeholder="25.01.2022"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Тип покупки</div>
                            <Form.Item
                                name="type"
                                rules={[{required: true}]}
                            >
                                <Select className="admin-select" placeholder="Выберите тип">
                                    <Option value="1"> Внутренняя покупка </Option>
                                    <Option value="2"> Внешняя покупка </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit mt-2 mb-2" type="primary" htmlType="submit">
                            Добавить товар
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="admin-modal"
                centered
                width={751}
                title="Доп информация"
                visible={isStatusModalVisible}
                onCancel={() => setIsStatusModalVisible(false)}
                footer={null}
            >
                <Form name="sell-channel" onFinish={onSellFinish}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="workstation"
                                rules={[{required: true}]}
                            >
                                <Select
                                    className="admin-select"
                                    placeholder="Где был продан товар"
                                >
                                    <Option value="1"> Trade Groups </Option>
                                    <Option value="2"> Accs Market </Option>
                                    <Option value="3"> Garant Market </Option>
                                    <Option value="4"> Fun Pay </Option>
                                    <Option value="5"> Другие </Option>
                                    <Option value="6"> Партнёры </Option>
                                    <Option value="7"> Mini Market </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="date_sell"
                                className="admin-input"
                                rules={[{required: true}]}
                            >
                                <Input placeholder="Дата продажи"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="price_sell"
                                className="admin-input"
                                rules={[{required: true}]}
                            >
                                <Input placeholder="Цена продажи"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit" type="primary" htmlType="submit">
                            Продолжить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                centered
                width={751}
                className="admin-modal"
                title="Доп информация"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    name="edit-channel"
                    onFinish={onEditFinish}
                    initialValues={our_channels ? our_channels[uid || 0] : undefined}
                >

                    {our_channels && our_channels[uid || 0] ? (
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={12}>
                                        <div className="admin-label"> Название</div>
                                        <div className="admin-psevdo-input">

                                            {our_channels[uid || 0]?.name}
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="admin-label"> Ссылка на канал</div>
                                        <div className="admin-psevdo-input">
                                            <a className="admin-link" target="_blank"
                                               rel="noreferrer" href={our_channels[uid || 0]?.url}
                                            >
                                                Открыть канал
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className="admin-label"> Аудитория чел</div>
                                        <div className="admin-psevdo-input">
                                            {our_channels[uid || 0]?.subs}
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="admin-label"> Сотрудник</div>
                                        <div className="admin-psevdo-input">
                                            {our_channels[uid || 0]?.worker
                                                ? workers.find(
                                                    (worker: IWorkers) =>
                                                        worker.id ===
                                                        our_channels[uid || 0]?.worker
                                                )?.name
                                                : "-"}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        ""
                    )}
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Дата покупки</div>
                            <Form.Item
                                className="first-column-table admin-input"
                                name="date_buy"
                            >
                                <Input placeholder="Дата покупки"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Дата продажи</div>
                            <Form.Item name="date_sell" className="admin-input">
                                <Input placeholder="Дата продажи"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Закупочная стоимость</div>
                            <Form.Item
                                name="price"
                                className="admin-input first-column-table"
                            >
                                <Input placeholder="Закупочная стоимость"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Расходы на товар</div>
                            <Form.Item name="expenses" className="admin-input">
                                <Input placeholder="Расходы на товар"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Продажа</div>
                            <Form.Item
                                name="price_sell"
                                className="admin-input first-column-table"
                            >
                                <Input placeholder="Продажа"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Чистая прибыль</div>
                            <Form.Item name="profit" className="admin-input">
                                <Input placeholder="Чистая прибыль"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Где был продан</div>
                            <Form.Item name="workstation">
                                <Select
                                    className="admin-select"
                                    placeholder="Где был продан товар"
                                >
                                    <Option value="1"> Trade Groups </Option>
                                    <Option value="2"> Accs Market </Option>
                                    <Option value="3"> Garant Market </Option>
                                    <Option value="4"> Fun Pay </Option>
                                    <Option value="5"> Другие </Option>
                                    <Option value="6"> Партнёры </Option>
                                    <Option value="7"> Mini Market </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit mb-2 mt-2" type="primary" htmlType="submit">
                            Обновить информацию
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}


export default Products
