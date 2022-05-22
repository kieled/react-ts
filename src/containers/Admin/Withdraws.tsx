import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Select, Row, Col, Statistic, TablePaginationConfig, Tabs} from "antd";
import {getWithdraws, editWithdraw, getWorkers, getUserStatistics} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import IWithdraws from "../../models/Admin/IWithdraws";
import IWorkers from "../../models/Admin/IWorkers";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;

const Withdraws = () => {
    const {withdraws, workers, user_stats, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()
    
    
    const [id, setId] = useState<number | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)

    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            await dispatch(getUserStatistics())
            document.title = "Панель управления"
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name("Заявки на вывод"))
            setIsLoading(true)
            await dispatch(getWithdraws('', '2', '', filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ filterStatus, current ])

    const onEdit = async (e: any) => {
        e.id = id;
        await dispatch(editWithdraw(e))
        setIsModalVisible(false)
    }

    const onEditModal = async (id: number) => {
        const uid = withdraws.findIndex((obj: IWithdraws) => obj.id === id);
        setId(id)
        setUid(uid)
        setIsModalVisible(true)
        form.resetFields();
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('2')
        } else if (id === '3') {
            setFilterStatus('1')
        } else if (id === '4') {
            setFilterStatus('3')
        }
    }

    const getStatus = (status: string) => {
        if (status === '1') {
            return "Оплачено";
        } else if (status === '2') {
            return "Ожидает";
        } else if (status === '3') {
            return "Отклонено";
        }
    };
    const getStatusId = (id: number, key = 1) => {
        const status = withdraws.find((app: IWithdraws) => app.id === id)?.status
        if (key === 1) {
            return getStatus(status || '');
        } else if (key === 2) {
            return getClassNameByStatus(status || '');
        }
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const getClassNameByStatus = (status: string) => {
        if (status === '1') {
            return "admin-withdraw-status-btn-success";
        } else if (status === '2') {
            return "admin-withdraw-status-btn-process";
        } else if (status === '3') {
            return "admin-withdraw-status-btn-canceled";
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Сотрудник",
            dataIndex: "author",
            key: "author",
            render: (item: number) => (
                <> {workers.find((worker: IWorkers) => worker.id === item)?.name} </>
            ),
        },
        {
            title: "Платежная система",
            dataIndex: "type_withdraw",
            key: "type_withdraw",
        },
        {
            title: "Сумма",
            dataIndex: "sum",
            key: "sum",
        },

        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <button
                        className={`admin-withdraw-status-btn ${getStatusId(id, 2)}`}
                        onClick={() => onEditModal(id)}
                    >

                        {getStatusId(id)}
                    </button>

                </div>
            )
        },
    ];

    return (
        <>
            <Row className="stats">
                <Col span={5}>
                    <Statistic
                        className="stat-box profit"
                        suffix="р"
                        title="Общая сумма пополнений"
                        groupSeparator=" "
                        value={user_stats?.transactions_sum}
                    />
                </Col>
                <Col span={5}>
                    <Statistic
                        className="stat-box count-sales"
                        suffix="р"
                        title="Общий баланс сотрудников"
                        groupSeparator=" "
                        value={user_stats?.balances}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        className="stat-box text-black"
                        suffix="р"
                        groupSeparator=" "
                        title="Доступно к выводу"
                        value={user_stats?.balance_main}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        className="stat-box text-black"
                        suffix="р"
                        title="В холде"
                        groupSeparator=" "
                        value={user_stats?.balance_hold}
                    />
                </Col>
            </Row>
            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все заявки" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="Ожидают" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Оплачены" key="3"> </Tabs.TabPane>
                <Tabs.TabPane tab="Отклоненны" key="4"> </Tabs.TabPane>
            </Tabs>
            <Modal
                centered
                width={751}
                className="admin-modal"
                title="Статус заявки на вывод"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}>
                <Form
                    form={form}
                    name="edit-withdraw"
                    initialValues={
                        withdraws !== null && uid !== null
                            ? withdraws[uid]
                            : undefined
                    }
                    onFinish={onEdit}
                >

                    <>
                        <Row>
                            <Col span={12}>
                                <div className="admin-label">Платежная система</div>
                                <div className="admin-psevdo-input first-column-table">
                                    {withdraws[uid || 0]?.type_withdraw}
                                </div>

                            </Col>
                            <Col span={12}>
                                <div className="admin-label">Реквизиты</div>
                                <div className="admin-psevdo-input admin-copiable">
                                    {withdraws[uid || 0]?.credentials}
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="admin-label">Дополнительные реквизиты</div>
                                <div className="admin-psevdo-input admin-copiable w100">
                                    {withdraws[uid || 0]?.credentials_name !== null
                                        ? withdraws[uid || 0]?.credentials_name : "-"}
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="admin-label"> Сумма</div>

                                <div className="admin-psevdo-input admin-copiable">
                                    {withdraws[uid || 0]?.sum}
                                </div>

                            </Col>
                            <Col span={12}>
                                <div className="admin-label"> Статус</div>
                                <Form.Item name="status">
                                    <Select className="admin-select">
                                        <Option value="2"> Ожидает </Option>
                                        <Option value="1"> Оплачено </Option>
                                        <Option value="3"> Отклонено </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Коментарий</div>

                            <Form.Item name="comment">
                                <Input.TextArea rows={4} className="admin-text-area"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button
                            className="green-btn-submit"
                            type="primary"
                            htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                sticky={true}
                columns={columns}
                dataSource={withdraws}
                loading={isLoading}
                rowKey={record => record.id}
                onChange={onPaginate}
                pagination={{current: current, pageSize: 10, total: count}}
            />
        </>
    );
}

export default Withdraws
