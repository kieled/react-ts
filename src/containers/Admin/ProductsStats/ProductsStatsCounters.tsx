import React, {FC} from 'react'
import {Col, Row, Statistic} from "antd"
import IStatsDetail from "../../../models/Admin/IStatsDetail";

type Props = {
    stats_detail: IStatsDetail | undefined
}


const ProductsStatsCounters: FC<Props> = ({stats_detail}) => {
    const getWorkstation = (id: string) => {
        const number = parseInt(id)
        if (number === 1) {
            return "Trade Groups"
        } else if (number === 2) {
            return "Accs Market"
        } else if (number === 3) {
            return "Garant Market"
        } else if (number === 4) {
            return "Fun Pay"
        } else if (number === 5) {
            return "Другие площадки"
        } else if (number === 6) {
            return "Партнёры"
        } else if (number === 7) {
            return "Mini Market"
        } else {
            return "-"
        }
    }
    
    return (
        <Row className="stats">
            <Col span={4}>
                <Statistic
                    className="stat-box count-sales"
                    title="Число продаж"
                    groupSeparator=" "
                    value={stats_detail?.count}
                />
            </Col>
            <Col span={5}>
                <Statistic
                    className="stat-box sum-sales"
                    suffix="р"
                    groupSeparator=" "
                    title="Продаж на сумму"
                    value={stats_detail?.sum}
                />
            </Col>
            <Col span={5}>
                <Statistic
                    className="stat-box profit"
                    suffix="р"
                    title="Чистая прибыль"
                    groupSeparator=" "
                    value={stats_detail?.profit}
                />
            </Col>
            <Col span={6}>
                <Statistic
                    className="stat-box workspace"
                    title="Эффективная площадка"
                    value={getWorkstation(stats_detail?.workstation? stats_detail?.workstation : '')}
                />
            </Col>
        </Row>
    )
}

export default ProductsStatsCounters