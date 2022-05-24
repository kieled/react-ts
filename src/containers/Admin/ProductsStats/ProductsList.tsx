import React, {FC} from 'react';
import {Table} from "antd";
import IMonthStats from "../../../models/Admin/IMonthStats";

type Props = {
    onModal: (id: number, value: number) => void
    stats: IMonthStats[]
    isLoading: boolean
}

const ProductsList: FC<Props> = ({
                          onModal,
                          stats,
                          isLoading
                      }) => {
    const columns = [
        {
            title: "Период",
            dataIndex: "name",
            key: "period",
        },
        {
            title: "Число продаж",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "Продаж на сумму",
            dataIndex: "sum",
            key: "sum",
        },
        {
            title: "Чистая прибыль",
            dataIndex: "profit",
            key: "profit",
        },
        {
            title: "",
            dataIndex: "id",
            key: "x",
            render: (id: number) => (
                <div className="d-flex">
                    <button
                        className="admin-products-btn-info admin-w-60"
                        onClick={() => onModal(id, 2)}
                    >
                        <span> Детализация </span>
                    </button>
                    <button
                        className="admin-products-btn-info admin-w-60"
                        onClick={() => onModal(id, 1)}
                    >
                        <span> Общий анализ </span>
                    </button>
                </div>
            )
        },
    ]

    return (
        <Table
            sticky={true}
            columns={columns}
            dataSource={stats}
            rowKey={item => item.id}
            loading={isLoading}
        />
    );
};

export default ProductsList;