import React, {FC} from 'react'
import IWorkers from "../../../models/Admin/IWorkers"
import {Button, Table, TablePaginationConfig} from "antd"
import {SettingOutlined} from "@ant-design/icons"
import IWithdraws from "../../../models/Admin/IWithdraws";

type Props = {
    workers: IWorkers[]
    onModal: (id: number) => void
    current: number
    count: number
    isLoading: boolean
    setCurrent: (value: number) => void
    withdraws: IWithdraws[]
}

const TransList: FC<Props> = ({
                                  workers,
                                  onModal,
                                  current,
                                  count,
                                  isLoading,
                                  setCurrent,
                                  withdraws
                              }) => {

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

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
    ]

    return (
        <Table
            sticky={true}
            columns={columns}
            pagination={{current: current, pageSize: 10, total: count}}
            rowKey={record => record.id}
            loading={isLoading}
            onChange={onPaginate}
            dataSource={withdraws}
        />
    )
}

export default TransList