import React, {useEffect, useState} from "react";
import {getRating} from "../../actions/auth";
import {Col, Row, Statistic} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Rating = () => {
    const {rating} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            await dispatch(getRating())
        }

        onLoad().then(() => setIsLoading(false))
    }, [  ])

    if (isLoading) {
        return null
    }

    return (
        <>
            <div className="stat-title"> Моя статистика</div>
            <div className="d-flex mobile-stats">
                <Statistic
                    className="stat-box workspace rating-stat rating-info"
                    title="Позиция в рейтинге"
                    groupSeparator=" "
                    value={rating?.current.col}
                />
                <Statistic
                    className="stat-box count-sales rating-stat rating-info"
                    groupSeparator=" "
                    title="Продано каналов"
                    value={rating?.current.count_trades}
                />
                <Statistic
                    className="stat-box profit rating-stat rating-info"
                    suffix="₽"
                    title="Заработано за все время"
                    groupSeparator=" "
                    value={rating?.current.sum_trades}
                />
            </div>
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
                        );
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
                        );
                    })}
                </Col>
            </Row>
        </>
    );
}

export default Rating
