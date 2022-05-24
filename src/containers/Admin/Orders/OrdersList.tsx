import React, {FC} from 'react'
import {Button, Table, TablePaginationConfig} from "antd"
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import IOrder from "../../../models/Admin/IOrder"

type Props = {
    onEditModal: (id: number) => void
    onDelete: (id: number) => void
    orders: IOrder[]
    isLoading: boolean
    current: number
    setCurrent: (value: number) => void
    count: number
}


const OrdersList: FC<Props> = ({onEditModal, onDelete, orders, isLoading, current, setCurrent, count}) => {
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
                            icon={< EditOutlined/>} onClick={() => onEditModal(id)}/>
                    <Button className="admin-action-btn"
                            icon={< DeleteOutlined/>} onClick={() => onDelete(id)}/>
                </>,
        },
    ]

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    return (
        <Table className="order-table"
               sticky={true}
               columns={columns}
               rowKey={item => item.id}
               dataSource={orders}
               loading={isLoading}
               pagination={{current: current, pageSize: 10, total: count}}
               onChange={onPaginate}
        />
    )
}

export default OrdersList