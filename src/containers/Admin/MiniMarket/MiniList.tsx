import React, {FC} from 'react';
import {Select, Table, TablePaginationConfig} from "antd";
import IOrder from "../../../models/Admin/IOrder";
import {EditOutlined} from "@ant-design/icons";

const {Option} = Select

type Props = {
    mini_orders: IOrder[]
    onStatusChange: (e: any, id: number) => void
    onEditModal: (id: number) => void
    isLoading: boolean
    current: number
    count: number
    setCurrent: (value: number) => void
}

const MiniList: FC<Props> = ({mini_orders, onStatusChange, onEditModal, isLoading, current, count, setCurrent}) => {
    const getStatusClass = (id: number) => {
        const status = parseInt(mini_orders.find((order: IOrder) => order.id === id)?.status || '0');
        if (status === 1) {
            return "admin-mini-status-active";
        } else if (status === 5) {
            return "admin-mini-status-deactive";
        }
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

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
    ]

    return (
        <Table sticky={true} columns={columns}
               rowKey={item => item.id}
               dataSource={mini_orders}
               loading={isLoading}
               pagination={{current: current, pageSize: 10, total: count}}
               onChange={onPaginate}
        />
    );
};

export default MiniList;