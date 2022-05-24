import React, {FC} from 'react'
import {Button, Table, TablePaginationConfig} from "antd"
import {EditOutlined} from "@ant-design/icons"
import IUser from "../../../models/Admin/IUser"

type Props = {
    onEditModal: (value: number) => void
    setCurrent: (value: number) => void
    isLoading: boolean
    users: IUser[]
    current: number
    count: number
}


const UsersList: FC<Props> = ({
                       onEditModal,
                       setCurrent,
                       isLoading,
                       users,
                       current,
                       count
                   }) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Дата регистрации",
            dataIndex: "date_joined",
            key: "date_joined",
        },
        {
            title: "Последняя активность",
            dataIndex: "last_login",
            key: "last_login",
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <Button
                        className="admin-action-btn"
                        icon={<EditOutlined/>}
                        onClick={() => onEditModal(id)}
                    />
                </div>
            )
        },
    ]

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    return (
        <Table
            sticky={true}
            columns={columns}
            rowKey={item => item.id}
            loading={isLoading}
            onChange={onPaginate}
            dataSource={users}
            pagination={{current: current, pageSize: 10, total: count}}
        />
    )
}

export default UsersList