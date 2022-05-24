import React, {FC} from 'react'
import {Table, TablePaginationConfig} from "antd"
import IWorkers from "../../../models/Admin/IWorkers"
import IWithdraws from "../../../models/Admin/IWithdraws";

type Props = {
    setCurrent: (value: number) => void
    withdraws: IWithdraws[]
    workers: IWorkers[]
    onEditModal: (id: number) => void
    isLoading: boolean
    current: number
    count: number
}


const WithdrawsList: FC<Props> = ({
                           setCurrent,
                           withdraws,
                           workers,
                           onEditModal,
                           isLoading,
                           current,
                           count
                       }) => {
    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const getStatus = (status: string) => {
        if (status === '1') {
            return "Оплачено"
        } else if (status === '2') {
            return "Ожидает"
        } else if (status === '3') {
            return "Отклонено"
        }
    }
    const getStatusId = (id: number, key = 1) => {
        const status = withdraws.find((app: IWithdraws) => app.id === id)?.status
        if (key === 1) {
            return getStatus(status || '')
        } else if (key === 2) {
            return getClassNameByStatus(status || '')
        }
    }

    const getClassNameByStatus = (status: string) => {
        if (status === '1') {
            return "admin-withdraw-status-btn-success"
        } else if (status === '2') {
            return "admin-withdraw-status-btn-process"
        } else if (status === '3') {
            return "admin-withdraw-status-btn-canceled"
        }
    }

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
    ]
    
    return (
        <Table
            sticky={true}
            columns={columns}
            dataSource={withdraws}
            loading={isLoading}
            rowKey={record => record.id}
            onChange={onPaginate}
            pagination={{current: current, pageSize: 10, total: count}}
        />
    )
}

export default WithdrawsList