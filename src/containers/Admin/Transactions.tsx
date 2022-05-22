import React, {useEffect, useState} from "react";
import {Button, Modal, Select, Table, DatePicker, Row, Col, TablePaginationConfig} from "antd";
import {getWithdraws, getWorkers} from "../../actions/admin";
import {SettingOutlined} from "@ant-design/icons";
import IWorkers from "../../models/Admin/IWorkers";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {layoutActions} from "../../reducers/layout";


const {Option} = Select;

const Transactions = () => {
    const {withdraws, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number | null>(null)
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [current, setCurrent] = useState(1)
    const dateFormat = "DD.MM.YYYY";

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name("Операции с балансом"))
            setIsLoading(true)
            await dispatch(getWithdraws(author, type, date, '', current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ date, type, author, current ])

    const onModal = (id: number) => {
        const uid = withdraws.findIndex((obj) => obj.id === id)
        setUid(uid)
        debugger
        setIsModalVisible(true)
    }

    const onWorkerFilter = async (e: any) => {
        setAuthor(e)
    }

    const onTypeFilter = async (e: any) => {
        setType(e)
    }

    const onDateFilter = async (e: any) => {
        if (!e) {
            setDate('')
        } else {
            try {
                const date = e._d.toJSON().slice(0, 10).split("-");
                const end = date[2] + "." + date[1] + "." + date[0].slice(2, 4);
                setDate(end)
            } catch (e) {
                setDate('')
            }
        }
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
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
    const columns = [
        {
            title: "Номер",
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
            title: "Тип операции",
            dataIndex: "type",
            key: "type",
            render: (item: string) => <> {item === "1" ? "Пополнение" : "Вывод"} </>,
        },
        {
            title: "Сумма",
            dataIndex: "sum",
            key: "sum",
            render: (item: string) => (<>{item} р.</>),
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <Button
                        className="admin-action-btn"
                        icon={<SettingOutlined/>}
                        onClick={() => onModal(id)}
                    />
                </div>
            )
        },
    ];

    return (
        <>
            <Row>
                <Col span={4}>
                    <Select
                        className="admin-select-filter" style={{width: "95%",}}
                        onChange={onWorkerFilter} allowClear placeholder="Выберите сотрудника">
                        {workers.map((worker: IWorkers) => {
                            return (
                                <Option key={worker.id} value={worker.id}>{worker.name}</Option>
                            );
                        })}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        className="admin-select-filter" style={{width: "95%",}}
                        onChange={onTypeFilter} allowClear placeholder="Выберите тип">
                        <Option key="1" value="1">Пополнение</Option>
                        <Option key="2" value="2">Вывод</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <DatePicker
                        className="admin-select-filter" style={{width: "95%",}}
                        onChange={onDateFilter} format={dateFormat}/>
                </Col>
            </Row>
            <Modal
                centered
                width={751}
                className="admin-modal"
                title="Статус заявки на вывод"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}>
                <>
                    {withdraws && uid !== null ? (
                        <div className="mb-5">
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Номер</div>
                                    <div className="admin-psevdo-input first-column-table admin-copiable">
                                        {withdraws[uid].id}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Сотрудник</div>
                                    <div className="admin-psevdo-input admin-copiable">
                                        {workers.find((worker: IWorkers) =>
                                            worker.id === withdraws[uid].author)?.name}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Тип операции</div>
                                    <div className="admin-psevdo-input first-column-table admin-copiable">
                                        {withdraws[uid].type === "1" ? "Пополнение" : "Вывод"}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Сумма</div>
                                    <div className="admin-psevdo-input admin-copiable">
                                        {withdraws[uid].sum}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label">Платежная система</div>
                                    <div className="admin-psevdo-input admin-copiable">
                                        {withdraws[uid]?.type_withdraw}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label">Реквизиты</div>
                                    <div className="admin-psevdo-input admin-copiable">
                                        {withdraws[uid]?.credentials}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label">Заказ</div>
                                    <div className="admin-psevdo-input first-column-table admin-copiable">
                                        {withdraws[uid].order ? withdraws[uid].order : "-"}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label">Статус</div>
                                    <div className="admin-psevdo-input admin-copiable">
                                        {getStatus(withdraws[uid]?.status)}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : ''}
                </>
            </Modal>
            <Table
                sticky={true}
                columns={columns}
                pagination={{current: current, pageSize: 10, total: count}}
                rowKey={record => record.id}
                loading={isLoading}
                onChange={onPaginate}
                dataSource={withdraws}
            />
        </>
    )
}

export default Transactions
