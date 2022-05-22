import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Select, Table, Tabs, Row, Col, TablePaginationConfig} from 'antd';
import {useAppDispatch, useAppSelector} from "../../hooks";
import IApp from "../../models/Admin/IApp";
import {editApp, getApps, getWorkers} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import IWorkers from "../../models/Admin/IWorkers";


const {Option} = Select;
const {TabPane} = Tabs;

const Applications = () => {
    const {apps, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [uid, setUid] = useState<number>(0)
    const [filterUser, setFiletUser] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            await dispatch(getWorkers())
            await dispatch(layoutActions.set_name('Заявки'))
            setIsLoading(true)
            await dispatch(getApps(filterUser, filterStatus, current))
            setIsLoading(false)
            document.title = 'Панель управления'

        }
        onLoad().then(null);

    }, [filterUser, filterStatus, current])

    const onChange = (id: string) => {
        if (id !== '1') {
            setCurrent(1)
            setFilterStatus(id)
        } else{
            setCurrent(1)
            setFilterStatus('')
        }
    };

    const onFinish = async (e: any) => {
        e.id = apps[uid]?.id
        await dispatch(editApp(e))
        setIsModalVisible(false)
    };

    const onFilter = async (e: string) => {
        setCurrent(1)
        setFiletUser(e)
    };

    const getStatus = (id: string) => {
        const number = parseInt(id)
        if (number === 1) {
            return "Активно"
        } else if (number === 2) {
            return "В процессе"
        } else if (number === 3) {
            return "На модерации"
        } else if (number === 4) {
            return "Выполнена"
        } else if (number === 5) {
            return "Отклонена"
        } else if (number === 6) {
            return "Просрочена"
        }
    };

    const getClassStatus = (id:number) => {
        try {
            const status = apps?.find((app: IApp) => app.id === id)?.status
            const number = parseInt(status || '0')
            if (number === 1) {
                return "admin-apps-active-btn"
            } else if (number === 2) {
                return "admin-apps-process-btn"
            } else if (number === 3) {
                return "admin-apps-moderate-btn"
            } else if (number === 4) {
                return "admin-apps-success-btn"
            } else if (number === 5) {
                return "admin-apps-cancel-btn"
            } else if (number === 6) {
                return "admin-apps-expired-btn"
            }
        } catch (err) {
            return null
        }
    };

    const onOpenModal = (id: number) => {
        setUid(apps?.findIndex(((obj) => obj.id === id)) || 0);
        setIsModalVisible(true);
        form.resetFields();
    };

    const getStatusId = (id: number) => {
        if (apps) {
            try {
                const app = apps?.find((app: IApp) => app.id === id)?.status
                return getStatus(app?app:'0')
            } catch (err) {
                return null
            }
        } else {
            return null
        }
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
            title: 'Тип заказа',
            dataIndex: 'name',
            key: 'name',
            render: (item: string) => <>{item === "None+" ? "прямая покупка" : item}</>
        },
        {
            title: 'Сотрудник',
            dataIndex: 'owner',
            key: 'owner',
            render: (item: string) => < > {
                workers?.find((worker:IWorkers) => worker.id === parseInt(item))?.name} </>
        },
        {
            title: 'Оплата',
            dataIndex: 'price_by_channel',
            key: 'price_by_channel',
            render: (item: string) => <>{item}р</>
        },
        {
            title: 'Статус',
            dataIndex: 'id',
            key: 'status',
            render: (item: string) =>
                <Button className={`admin-status-btn ` + getClassStatus(parseInt(item))}
                        onClick={() => {
                            onOpenModal(parseInt(item))
                        }}>
                    {getStatusId(parseInt(item))}
                </Button>
        },
    ];

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    return (
        <>
            <Row>
                <Col>
                    <Select className="admin-select-filter" onChange={onFilter}
                            allowClear placeholder='Выберите сотрудника'>
                        {workers?.map((worker: IWorkers) => {
                            return <Option key={worker.id}
                                           value={worker.id}> {worker.name} </Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Все заявки" key="1"> </TabPane>
                <TabPane tab="В процессе" key="2"> </TabPane>
                <TabPane tab="На модерации" key="3"> </TabPane>
                <TabPane tab="Выполненные" key="4"> </TabPane>
                <TabPane tab="Отклоненные" key="5"> </TabPane>
            </Tabs>
            <Table sticky={true} pagination={{current: current, pageSize: 10, total: count}}
                   rowKey={record => record.id}
                   columns={columns} className="admin-apps-table"
                   dataSource={apps} onChange={onPaginate}
                   loading={isLoading}
            />

            <Modal centered width={751} title="Статус заявки"
                   visible={isModalVisible} footer={null}
                   onCancel={() => setIsModalVisible(false)}>
                <Form form={form} name="edit-order"
                      onFinish={onFinish} initialValues={apps? apps[uid] : undefined}> {
                    apps ?
                        <>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label">Канал</div>
                                    <div className="admin-psevdo-input">
                                        <a target="_blank" rel="noreferrer"
                                           href={apps[uid]?.channel}>
                                            Перейти</a>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label">Дата</div>
                                    <div className="admin-psevdo-input"> {apps[uid]?.date}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Тип заказа</div>
                                    <div className="admin-psevdo-input"> {
                                        apps[uid]?.name === 'None+' ? 'прямая покупка'
                                            : apps[uid]?.name}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label">К оплате</div>
                                    <div className="admin-psevdo-input">
                                        {apps[uid]?.price_by_channel}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Почта для передачи прав владельца</div>
                                    <div className="admin-psevdo-input"> {apps[uid]?.email} </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Сотрудник</div>
                                    <div className="admin-psevdo-input"> {
                                        workers?.find((worker: IWorkers) =>
                                            worker.id === apps[uid]?.owner)?.name
                                    } | ID : {apps[uid]?.owner}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label">Дизайн</div>
                                    <div className="admin-psevdo-input">
                                        {apps[uid]?.design !== null ?
                                            <a href={apps[uid]?.design?.url}>
                                                {apps[uid]?.design?.category}
                                                {apps[uid]?.design?.id}
                                            </a> : 'Отключён'}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Статус заявки</div>
                                    <div>
                                        <Form.Item name="status"
                                                   rules={[{required: true, message: 'Выберите статус'}]}>
                                            <Select className="admin-select select-place-black"
                                                    placeholder="Выберите тип контента">
                                                <Option value="2"> В работе </Option>
                                                <Option value="3"> На модерации </Option>
                                                <Option value="4"> Выполнена </Option>
                                                <Option value="5"> Отклонена </Option>
                                                <Option value="6"> Просрочена </Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row> </> : ''}
                    <Row>
                        <Col span={24}>
                            <div className="admin-label">Комментарий(необязательно)</div>
                            <Form.Item name="comment">
                                <Input.TextArea rows={4} className="admin-text-area"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit" type="primary" htmlType="submit">
                            Обновить статус
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


export default Applications