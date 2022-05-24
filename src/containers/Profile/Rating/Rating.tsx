import React, {useEffect, useState} from "react"
import {getRating} from "../../../actions/auth"
import {Col, Row, Skeleton} from "antd"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import Stats from "./Stats";


const Rating = () => {
    const {rating} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            await dispatch(getRating())
        }

        onLoad().then(() => setIsLoading(false))
    }, [])

    const fakeItem = (id: number) => {
        return <div key={id.toString() + Math.random() * 9 + 1} className="stats-table-col stats-table-card">
            <Skeleton active paragraph={false}/>
        </div>
    }

    const fakeTable = () => {
        let list = []
        for (let i = 0; i < 10; i++) {
            list.push(fakeItem(i))
        }
        return list
    }

    if (isLoading) {
        return (
            <>
                <div className="stat-title"> Моя статистика</div>
                <Stats current={undefined} isLoading={true}/>
                <Row>
                    <Col span={11} className="pb-5 mobile-stat-list">
                        <div className="stat-title"> Топ 10</div>
                        <div className="stat-subtitle"> Текущий месяц</div>
                        <div className="stats-table-col table-items-stats">
                            <div className="id-name">
                                <div className="id"> #</div>
                                <div className="name"> Участник</div>
                            </div>
                            <div className="count"> Заработал</div>
                        </div>
                        {fakeTable()}
                    </Col>
                    <Col span={11} offset={2} className="pb-5 mobile-hide">
                        <div className="stat-title"> Топ 10</div>
                        <div className="stat-subtitle"> За все время</div>
                        <div className="stats-table-col table-items-stats">
                            <div className="id-name">
                                <div className="id"> #</div>
                                <div className="name"> Участник</div>
                            </div>
                            <div className="count"> Заработал</div>
                        </div>
                        {fakeTable()}
                    </Col>
                </Row>
            </>
        )
    }

    return (
        <>
            <div className="stat-title"> Моя статистика</div>
            <Stats current={rating?.current} isLoading={false}/>
            <Row>
                <Col span={11} className="pb-5 mobile-stat-list">
                    <div className="stat-title"> Топ 10</div>
                    <div className="stat-subtitle"> Текущий месяц</div>
                    <div className="stats-table-col table-items-stats">
                        <div className="id-name">
                            <div className="id"> #</div>
                            <div className="name"> Участник</div>
                        </div>
                        <div className="count"> Заработал</div>
                    </div>
                    {rating?.month.map((item: any) => {
                        return (
                            <div key={`month${item.name}`}>
                                <div className="stats-table-col stats-table-card">
                                    <div className="id-name">
                                        <div className="id"> {item.col_month} </div>
                                        <div className="name"> {item.name} </div>
                                    </div>
                                    <div className="count"> {item.monthly}р</div>
                                </div>
                            </div>
                        )
                    })}
                </Col>
                <Col span={11} offset={2} className="pb-5 mobile-hide">
                    <div className="stat-title"> Топ 10</div>
                    <div className="stat-subtitle"> За все время</div>
                    <div className="stats-table-col table-items-stats">
                        <div className="id-name">
                            <div className="id"> #</div>
                            <div className="name"> Участник</div>
                        </div>
                        <div className="count"> Заработал</div>
                    </div>
                    {rating?.users.map((item: any) => {
                        return (
                            <div key={`all${item.name}`}>
                                <div className="stats-table-col stats-table-card">
                                    <div className="id-name">
                                        <div className="id"> {item.col}</div>
                                        <div className="name"> {item.name}</div>
                                    </div>
                                    <div className="count"> {item.sum_trades}р</div>
                                </div>
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </>
    )
}

export default Rating
