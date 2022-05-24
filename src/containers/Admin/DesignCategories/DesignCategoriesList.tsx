import React, {FC} from 'react';
import {Button, Table, TablePaginationConfig} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import IDesignCategories from "../../../models/Admin/IDesignCategories";

type Props = {
    setCurrent: (value: number) => void
    onDelete: (id: number) => void
    isLoading: boolean
    current: number
    count: number
    design_categories: IDesignCategories[]
}

const DesignCategoriesList: FC<Props> = ({setCurrent, onDelete, isLoading, current, count, design_categories}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Имя категории',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'x',
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <Button className="admin-action-btn" icon={<DeleteOutlined/>}
                            onClick={() => onDelete(id)}/>
                </div>),
        },
    ]

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    return (
        <Table tableLayout="auto"
               sticky={true}
               columns={columns}
               rowKey={item => item.id}
               loading={isLoading}
               onChange={onPaginate}
               pagination={{current: current, pageSize: 10, total: count}}
               dataSource={design_categories}/>
    );
};

export default DesignCategoriesList;