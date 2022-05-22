import React, {useEffect, useState} from "react";
import {Modal, Table, Statistic, Col, Row, Select} from "antd";
import {getStats, getPeriodStats} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import "../../css/stats.css";
import IStats from "../../models/Admin/IStats";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;

const ProductsStats = () => {
    const {stats, stats_detail} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
    const [uid, setUid] = useState<number | null>(null)
    const [period, setPeriod] = useState("0")
    const [work, setWork] = useState("0",)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            dispatch(layoutActions.set_name("Анализ продаж"))
            setIsLoading(true)
            await dispatch(getPeriodStats({period, work}))
            await dispatch(getStats())
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [period, work])

    const onModal = async (id: number, type: number) => {
        const uid = stats.findIndex((obj: IStats) => obj.id === id)
        setUid(uid)
        if (type === 1) {
            setIsModalVisible(true)
        } else if (type === 2) {
            setIsDetailModalVisible(true)
        }
    }

    const onFilterPeriod = async (e: string) => {
        setPeriod(e)
    }

    const onFilterWork = async (e: string) => {
        setWork(e)
    }

    const getWorkstation = (id: string) => {
        const number = parseInt(id)
        if (number === 1) {
            return "Trade Groups";
        } else if (number === 2) {
            return "Accs Market";
        } else if (number === 3) {
            return "Garant Market";
        } else if (number === 4) {
            return "Fun Pay";
        } else if (number === 5) {
            return "Другие площадки";
        } else if (number === 6) {
            return "Партнёры";
        } else if (number === 7) {
            return "Mini Market";
        } else {
            return "-";
        }
    };
    const columns = [
        {
            title: "Период",
            dataIndex: "name",
            key: "period",
        },
        {
            title: "Число продаж",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Продаж на сумму",
            dataIndex: "sum",
            key: "sum",
        },
        {
            title: "Чистая прибыль",
            dataIndex: "profit",
            key: "profit",
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="d-flex">
                    <button
                        className="admin-products-btn-info admin-w-60"
                        onClick={() => onModal(id, 2)}
                    >
                        <span> Детализация </span>
                    </button>
                    <button
                        className="admin-products-btn-info admin-w-60"
                        onClick={() => onModal(id, 1)}
                    >
                        <span> Общий анализ </span>
                    </button>
                </div>
            )
        },
    ];
    const new_columns = [
        {
            title: "Период",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Число продаж",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Продаж на сумму",
            dataIndex: "sum",
            key: "sum",
        },
        {
            title: "Чистая прибыль",
            dataIndex: "profit",
            key: "profit",
        },
    ];
    return (
        <>
            <div className="filters">
                <Select
                    className="filter-select"
                    onChange={onFilterPeriod}
                    defaultValue="0"
                >
                    <Option key="0" value="0">С начала месяца</Option>
                    <Option key="1" value="7">1 день</Option>
                    <Option key="2" value="1">7 дней</Option>
                    <Option key="3" value="2">14 дней</Option>
                    <Option key="4" value="3">Месяц</Option>
                    <Option key="5" value="4">Два месяца</Option>
                    <Option key="6" value="5">Три месяца</Option>
                    <Option key="7" value="6">Пол года</Option>
                </Select>
                <Select
                    className="filter-select"
                    onChange={onFilterWork}
                    defaultValue="0"
                >
                    <Option key="0" value="0">Площадка(Все)</Option>
                    <Option key="1" value="1">Trade Groups</Option>
                    <Option key="2" value="2">Accs Market</Option>
                    <Option key="3" value="3">Garant Market</Option>
                    <Option key="4" value="4">Fun Pay</Option>
                    <Option key="5" value="5">Другие</Option>
                    <Option key="6" value="6">Партнеры</Option>
                    <Option key="7" value="7">Mini Market</Option>
                </Select>
            </div>
            <Modal
                centered
                className="admin-modal"
                width={751}
                title="Общая информация"
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}>
                <>
                    {uid !== null ? (
                        <>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Период</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].name}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Кол - во продаж</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].count}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Сумма продаж</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].sum}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Расходы</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].expenses}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Чистая прибыль</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].profit}
                                    </div>
                                </Col>
                            </Row>
                            <h3 className="title mt-3"> Статистика продаж по площадкам </h3>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Accs Market</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].accs_count}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Trade Groups</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].trade_count}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Garant Market</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].garant_count}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Fun Pay</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].fun_count}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Другие площадки</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].other_count}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Партнеры</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].partners_count}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="mb-5">
                                    <div className="admin-label"> Mini Market</div>
                                    <div className="admin-psevdo-input">
                                        {stats[uid].minimarket_count}
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        ""
                    )}
                </>
            </Modal>
            <Modal
                centered
                className="admin-modal"
                width={751}
                title="Детализация"
                visible={isDetailModalVisible}
                footer={null}
                onCancel={() => setIsDetailModalVisible(false)}>
                <>
                    {uid !== null ? (
                        <>
                            <Table
                                columns={new_columns}
                                pagination={false}
                                rowKey={item => item.id}
                                dataSource={stats[uid].days}/>
                        </>
                    ) : ""}
                </>
            </Modal>
            {period ? (
                <Row className="stats">
                    <Col span={4}>
                        <Statistic
                            className="stat-box count-sales"
                            title="Число продаж"
                            groupSeparator=" "
                            value={stats_detail?.count}
                        />
                    </Col>
                    <Col span={5}>
                        <Statistic
                            className="stat-box sum-sales"
                            suffix="р"
                            groupSeparator=" "
                            title="Продаж на сумму"
                            value={stats_detail?.sum}
                        />
                    </Col>
                    <Col span={5}>
                        <Statistic
                            className="stat-box profit"
                            suffix="р"
                            title="Чистая прибыль"
                            groupSeparator=" "
                            value={stats_detail?.profit}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            className="stat-box workspace"
                            title="Эффективная площадка"
                            value={getWorkstation(stats_detail?.workstation? stats_detail?.workstation : '')}
                        />
                    </Col>
                </Row>
            ) : (
                ""
            )}
            <Table
                sticky={true}
                columns={columns}
                dataSource={stats}
                rowKey={item => item.id}
                loading={isLoading}
            />
        </>
    );
}


export default ProductsStats
