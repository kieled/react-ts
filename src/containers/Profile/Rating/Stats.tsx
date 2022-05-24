import React, {FC} from 'react'
import {Statistic} from "antd"


type Props = {
    current: {
        col: number
        count_trades: number
        sum_trades: number
    } | undefined
    isLoading: boolean
}

const Stats: FC<Props> = ({
                              current,
                              isLoading
                          }) => {
    return (
        <div className="d-flex mobile-stats">
            <Statistic
                className="stat-box workspace rating-stat rating-info"
                title="Позиция в рейтинге"
                groupSeparator=" "
                value={current?.col}
                loading={isLoading}
            />
            <Statistic
                className="stat-box count-sales rating-stat rating-info"
                groupSeparator=" "
                title="Продано каналов"
                value={current?.count_trades}
                loading={isLoading}
            />
            <Statistic
                className="stat-box profit rating-stat rating-info"
                suffix="₽"
                title="Заработано за все время"
                groupSeparator=" "
                value={current?.sum_trades}
                loading={isLoading}
            />
        </div>
    )
}

export default Stats