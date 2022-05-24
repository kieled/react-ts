import React, {FC} from 'react'
import {Select, Table, TablePaginationConfig, Typography} from "antd"
import IChannel from "../../../models/Admin/IChannel"
import {InfoCircleOutlined} from "@ant-design/icons"

const {Option} = Select
const {Paragraph} = Typography

type Props = {
    onExpensesChange: (value: string, id: number) => void
    our_channels: IChannel[]
    onOpenModal: (id: number) => void
    setCurrent: (value: number) => void
    onStatusChange: (type: number, id: number) => void
    current: number
    count: number
    isLoading: boolean
}

const ProductsList: FC<Props> = ({
                                     onExpensesChange,
                                     our_channels,
                                     onOpenModal,
                                     setCurrent,
                                     onStatusChange,
                                     current,
                                     count,
                                     isLoading
                                 }) => {

    const getStatusByID = (id: number) => {
        return our_channels.find((item: IChannel) => item.id === id)?.status
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const getStatusClass = (id: number) => {
        const status = getStatusByID(id)
        if (status === "1") {
            return "admin-status-status-btn-proccess"
        } else if (status === "2") {
            return "admin-status-status-btn-success"
        } else if (status === "3") {
            return "admin-status-status-btn-archive"
        } else if (status === "4") {
            return "admin-status-status-btn-waiting"
        }
    }

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
                    )
                } catch (err) {
                    return null
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
                    )
                } catch (err) {
                    return null
                }
            }
        },
    ]

    return (
        <Table
            pagination={{current: current, pageSize: 10, total: count}}

            sticky={true}
            rowKey={item => item.id}
            dataSource={our_channels}
            columns={columns}
            loading={isLoading}
            onChange={onPaginate}
        />
    )
}

export default ProductsList