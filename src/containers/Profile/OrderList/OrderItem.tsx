import React, {FC} from 'react'
import {Button, Col, Row} from "antd"
import {ReactComponent as Flash} from "../../../svg/flash.svg"
import {ReactComponent as Chart} from "../../../svg/chart.svg"
import IOrder from "../../../models/Users/IOrder"

type Props = {
    item: IOrder
    onOpenModal: (id: number) => void
}

const OrderItem:FC<Props> = ({
                       item,
                       onOpenModal
                   }) => {
    return (
        <Row align="middle" className="order bold-text" key={item.id}>
            <Col span={1}>
                {item.type === "1" ? (
                    <div className="thunder">
                        <Flash/>
                    </div>
                ) : (
                    <div className="barchart">
                        <Chart/>
                    </div>
                )}
            </Col>
            <Col span={6} className="main-card-subs">
                <div className="table-rows"> Кол-во подписчиков</div>
                {item.name}
            </Col>
            <Col span={4}>
                <div className="table-rows pc-hide">Цена за подписчика</div>
                {item.price_by_subs} </Col>
            <Col span={4}>
                <div className="table-rows pc-hide">Тип контента</div>
                {item.type_content} </Col>
            <Col span={6}>
                <div className="table-rows pc-hide">Тип модерации</div>
                {item.type === "1" ? "Быстрая" : "До двух дней"}
            </Col>
            <Col span={3}>
                <Button
                    type="primary"
                    className={`${item.type === "1" ? "thunder-button" : "chart-button"} mobile-get-btn`}
                    onClick={() => onOpenModal(item.id)}
                >
                    <span className="mobile-hide">Взять заказ</span>
                    <span className="pc-hide">Взять</span>
                </Button>
            </Col>
        </Row>
    )
}

export default OrderItem