import React, {FC} from 'react'
import {Modal, Table} from "antd"
import IMonthStats from "../../../models/Admin/IMonthStats"

type Props = {
    isDetailModalVisible: boolean
    setIsDetailModalVisible: (value: boolean) => void
    stat: IMonthStats | undefined
}

const ProductsDetailModal: FC<Props> = ({
                                 isDetailModalVisible,
                                 setIsDetailModalVisible,
                                 stat
                             }) => {
    const columns = [
        {
            title: "Период",
            dataIndex: "date",
            key: "date",
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
    ]

    return (
        <Modal
            centered
            className="admin-modal"
            width={751}
            title="Детализация"
            visible={isDetailModalVisible}
            footer={null}
            onCancel={() => setIsDetailModalVisible(false)}
        >
            <Table
                columns={columns}
                pagination={false}
                rowKey={item => item.id}
                dataSource={stat?.days}/>
        </Modal>
    )
}

export default ProductsDetailModal