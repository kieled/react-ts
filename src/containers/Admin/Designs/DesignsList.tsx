import React, {FC} from 'react'
import {Table, TablePaginationConfig} from "antd"
import {SettingOutlined} from "@ant-design/icons"
import IDesigns from "../../../models/Admin/IDesigns"

type Props = {
    designs: IDesigns[]
    getCategory: (id: number) => string
    onEditModal: (id: number) => void
    setCurrent: (value: number) => void
    isLoading: boolean
    current: number
    count: number
}

const DesignsList: FC<Props> = ({
                                    designs,
                                    getCategory,
                                    onEditModal,
                                    setCurrent,
                                    isLoading,
                                    current,
                                    count}) => {

    const getStatusClass = (id: number) => {
        const status = parseInt(designs.find((item: IDesigns) => item.id === id)?.status || '0')
        if (status === 1) {
            return "admin-design-status-active"
        } else if (status === 2) {
            return "admin-design-status-used"
        } else if (status === 3) {
            return "admin-design-status-reserved"
        }
    }

    const getStatus = (val: number) => {
        const status = designs.find((item: IDesigns) => item.id === val)?.status
        const id = parseInt(status || '0')
        if (id === 1) {
            return "Активно"
        } else if (id === 2) {
            return "Использовно"
        } else if (id === 3) {
            return "Зарезервировано"
        } else {
            return null
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            render: (id: number) => getCategory(id),
        },
        {
            title: 'Ссылка на архив',
            dataIndex: 'url',
            key: 'url',
            render: (url: string) => <a className="admin-link" href={url} target="_blank"
                                        rel="noreferrer"> {url} </a>
        },
        {
            title: 'Статус',
            dataIndex: 'id',
            key: 'x',
            className: 'admin-actions-header',
            render: (id: number) =>
                <div className="admin-action-buttons">
                    <button className="admin-action-btn" onClick={() => onEditModal(id)}>
                        <SettingOutlined/>
                    </button>
                    <div className={`admin-design-status ${getStatusClass(id)}`}>
                        {getStatus(id)}
                    </div>
                </div>
        },
    ]

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    return (
        <Table tableLayout="auto"
               sticky={true}
               loading={isLoading}
               pagination={{current: current, pageSize: 10, total: count}}
               rowKey={record => record.id}
               columns={columns}
               dataSource={designs}
               onChange={onPaginate}
        />
    )
}

export default DesignsList