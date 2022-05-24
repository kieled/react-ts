import React, {FC} from 'react'
import {Col, Row, Skeleton} from "antd"

type Props = {
    balance: number
    hold: number
    isLoading: boolean
}


const MainBalanceBlocks: FC<Props> = ({
                                          balance,
                                          hold,
                                          isLoading
                                      }) => {
    return (
        <Col span={7} className="mobile-balance">
            <div className="balance-main mb15">
                <div className="balance-descrp">Основной баланс</div>
                <Skeleton paragraph={false} active loading={isLoading}>
                    <div className="balance-count">
                        {balance}
                        <span className="weighnorlal-white">₽</span>
                    </div>
                </Skeleton>
            </div>
            <div className="balance-hold">
                <div className="balance-hold-dscr">На удержании</div>
                <Skeleton paragraph={false} active loading={isLoading}>
                    <div className="hold-count">
                        {hold}
                        <span className="weighnorlal-black">₽</span>
                    </div>
                </Skeleton>
            </div>
        </Col>
    )
}

export default MainBalanceBlocks