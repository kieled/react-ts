import React, {FC} from 'react';
import {Select, Table, TablePaginationConfig} from "antd";
import IWorkers from "../../../models/Admin/IWorkers";
import IChannel from "../../../models/Admin/IChannel";


const {Option} = Select

type Props = {
    workers: IWorkers[]
    channels: IChannel[]
    onOpenModal: (value: number) => void
    onStatusChange: (e: string, id: number) => void
    current: number
    count: number
    isLoading: boolean
    setCurrent: (value: number) => void
}

const ChannelsList: FC<Props> = ({
                                          workers,
                                          channels,
                                          onOpenModal,
                                          onStatusChange,
                                          current,
                                          count,
                                          isLoading,
                                          setCurrent
                                      }) => {
    const onPaginate = (newPaginate: TablePaginationConfig) => {
        setCurrent(newPaginate.current || 1)
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
            render: (id: number) => <div className="admin-action-buttons"><a
                className="admin-default-link margins-for-link" target="_blank"
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
    ]

    const getStatusClass = (status: string | undefined) => {
        if (status === '1') {
            return 'admin-status-channels admin-status-channels-active'
        } else {
            return 'admin-status-channels admin-status-channels-deactive'
        }
    }


    return (
        <Table rowKey={item => item.id} sticky={true} onChange={onPaginate}
               pagination={{current: current, pageSize: 10, total: count}}
               className="admin-chan-table" tableLayout={"auto"} loading={isLoading}
               dataSource={channels} columns={columns}/>
    )
}

export default ChannelsList