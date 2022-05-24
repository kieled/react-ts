import React, {FC} from 'react'
import {Col, Row, Statistic} from "antd"
import IUserStats from "../../../models/Admin/IUserStats"

type Props = {
    user_stats: IUserStats | undefined
}

const Stats: FC<Props> = ({user_stats}) => {
    return (
        <Row className="stats">
            <Col span={5}>
                <Statistic
                    className="stat-box profit"
                    suffix="р"
                    title="Общая сумма пополнений"
                    groupSeparator=" "
                    value={user_stats?.transactions_sum}
                />
            </Col>
            <Col span={5}>
                <Statistic
                    className="stat-box count-sales"
                    suffix="р"
                    title="Общий баланс сотрудников"
                    groupSeparator=" "
                    value={user_stats?.balances}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    className="stat-box text-black"
                    suffix="р"
                    groupSeparator=" "
                    title="Доступно к выводу"
                    value={user_stats?.balance_main}
                />
            </Col>
            <Col span={4}>
                <Statistic
                    className="stat-box text-black"
                    suffix="р"
                    title="В холде"
                    groupSeparator=" "
                    value={user_stats?.balance_hold}
                />
            </Col>
        </Row>
    )
}

export default Stats