import React, {useEffect, useState} from "react";
import {
    getChannels, editChannel, getActualDesigns,
    buyChannel, getWorkers, deleteChannel
} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {Button, Select, Table, Modal, Form, Input, Row, Col, Tabs, TablePaginationConfig} from "antd";
import IChannel from "../../models/Admin/IChannel";
import IWorkers from "../../models/Admin/IWorkers";
import IDesigns from "../../models/Admin/IDesigns";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;
const {Search} = Input;

const Channels = () => {
    const {channels, designs, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(true),
        [isModalVisible, setIsModalVisible] = useState(false),
        [filterWorker, setFilterWorker] = useState(''),
        [filterSearch, setSearch] = useState(''),
        [id, setId] = useState<number | null>(null),
        [filterStatus, setFilterStatus] = useState(''),
        [minSubsFilter, setMinSubsFilter] = useState(''),
        [maxSubsFilter, setMaxSubsFilter] = useState(''),
        [current, setCurrent] = useState(1)

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name('Каналы'))
            setIsLoading(true)
            await dispatch(getChannels(filterWorker, filterSearch, filterStatus, minSubsFilter, maxSubsFilter, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [filterStatus, filterSearch, filterWorker, minSubsFilter, maxSubsFilter, current])

    const onStatusChange = async (e: string, id: number) => {
        if (e === '5') {
            await dispatch(deleteChannel(id))
        } else {
            const data = {id: id, status: e}
            await dispatch(editChannel(data))
        }
    }

    const onOpenModal = async (id: number) => {
        await dispatch(getActualDesigns())
        setIsModalVisible(true)
        setId(id);
    };

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('1')
        } else if (id === '3') {
            setFilterStatus('3')
        }
    };

    const onFinish = async (e: any) => {
        e.id = id
        await dispatch(buyChannel(e))
        setIsModalVisible(false)
    }

    const onWorkerFilter = async (e: string) => {
        setFilterWorker(e)
    };

    const onIDFilter = async (e: string) => {
        setSearch(e)
    };

    const onFilterCount = async (type: number, e: any) => {
        if (type === 1) {
            if (isNaN(parseInt(e.target.value))) {
                setMinSubsFilter('');
            } else {
                setMinSubsFilter(e.target.value);
            }
        } else if (type === 2) {
            if (isNaN(parseInt(e.target.value))) {
                setMaxSubsFilter('');
            } else {
                setMaxSubsFilter(e.target.value);
            }
        }
    }

    const onPaginate = (newPaginate: TablePaginationConfig) => {
        setCurrent(newPaginate.current || 1)
    }

    const getStatusClass = (status: string | undefined) => {
        if (status === '1') {
            return 'admin-status-channels admin-status-channels-active'
        } else {
            return 'admin-status-channels admin-status-channels-deactive'
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            colSpan: 1
        },
        {
            title: 'Кол-во подписчиков',
            dataIndex: 'subs',
            key: 'subs',
            width: 250
        },
        {
            title: 'Сотрудник',
            dataIndex: 'worker',
            key: 'worker',
            render: (id: number) => <> {
                workers.find((item: IWorkers) => item.id === id)?.name || '-'
            } </>,
            width: 200
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'url',
            render: (id: number) => <div className="admin-action-buttons"><a className="admin-default-link margins-for-link" target="_blank"
                                         rel="noreferrer"
                                         href={channels.find((channel: IChannel) => channel.id === id)?.url}>
                Посмотреть</a></div>
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'x',
            render: (id: number) =>
                <
                    div className="admin-action-buttons">
                    {!channels.find((channel) => channel.id === id)?.is_requested ?
                        !(workers.find(
                            (item: IWorkers) => item.id === channels.find(
                                (channel) => channel.id === id)?.worker))?.is_minimarket
                            ? '' : <button className="admin-channels-buy-btn"
                                           onClick={() => onOpenModal(id)}>Купить</button> : ''}
                    <Select className={getStatusClass(channels.find(
                        (channel) => channel.id === id)?.status)} placeholder="Статус"
                            value={channels.find((channel) => channel.id === id)?.status}
                            onChange={(e) => onStatusChange(e, id)}>
                        <Option value="1">Активирован</Option>
                        <Option value="3">Деактивирован</Option>
                        <Option value="5">Удалить</Option>
                    </Select>
                </div>
        },
    ];
    return <>
        <Row gutter={16}>
            <Col span={4}>
                <Select className="admin-select-filter"
                        onChange={onWorkerFilter} allowClear
                        placeholder='Выберите сотрудника'> {workers.map((worker: IWorkers) => {
                    return <Option key={worker.id} value={worker.id}> {worker.name}</Option>
                })}
                </Select>
            </Col>
            <Col span={8}>
                <Search className="admin-channels-search m0"
                        placeholder="Введите ID, название канала или url" onSearch={onIDFilter}/>
            </Col>
            <Col span={4} className="ml-2">
                <Form.Item className='admin-input'>
                    <Input onChange={(e) => onFilterCount(1, e)}
                           placeholder='От'/>
                </Form.Item>
            </Col>
            <Col span={4} className="ml-2">
                <Form.Item className='admin-input'>
                    <Input onChange={(e) => onFilterCount(2, e)}
                           placeholder='До'/>
                </Form.Item>
            </Col>

        </Row>
        <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
            <Tabs.TabPane tab="Все каналы" key="1"> </Tabs.TabPane>
            <Tabs.TabPane tab="Активированные" key="2"> </Tabs.TabPane>
            <Tabs.TabPane tab="Деактивированные" key="3"> </Tabs.TabPane>
        </Tabs>
        <Table rowKey={item => item.id} sticky={true} onChange={onPaginate}
               pagination={{current: current, pageSize: 10, total: count}}
               className="admin-chan-table" tableLayout={"auto"} loading={isLoading}
                           dataSource={channels} columns={columns}/>
        <Modal width={751} className="admin-modal" title="Покупка канала"
               visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
            <Form name="create-request" onFinish={onFinish}>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость</div>
                        <Form.Item className="admin-input first-column-table" name="price"
                                   rules={[{required: true}]}>
                            <Input placeholder="Укажите стоимость канала"/>
                        </Form.Item>
                    </Col> <Col span={12}>
                    <div className="admin-label"> Тип контента</div>
                    <Form.Item name="type_content"
                               rules={[{required: true}]}>
                        <Select className="admin-select" placeholder="Выберите тип контента">
                            <Option value="1"> Шортс </Option>
                            <Option value="2"> Авторский </Option>
                        </Select>
                    </Form.Item>
                </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Время на выполнение</div>
                        <Form.Item name="time_to_do" className="first-column-table"
                                   rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите срок">
                                <Option value="1"> 1 час </Option>
                                <Option value="6"> 6 часов </Option>
                                <Option value="24"> 24 часа </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Оформление</div>
                        <Form.Item name="design">
                            <Select className="admin-select" placeholder="Выберите оформление">
                                {designs.map((design: IDesigns) => {
                                    return <Option key={design.id} value={design.id}> {
                                        design.category} {design.id} </Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Почта для передачи прав владельца</div>
                        <Form.Item className="admin-input first-column-table" name="email"
                                   rules={[{required: true}]}>
                            <Input placeholder="Введите адрес почты"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Бонус за выполнение</div>
                        <Form.Item name="bonus" className="admin-input">
                            <Input placeholder="Только для авторского контента*"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="form-btn">
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Отправить предложение
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}


export default Channels