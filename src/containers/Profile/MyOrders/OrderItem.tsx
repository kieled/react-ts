import React, {FC} from 'react'
import {Col, Row} from 'antd'
import {Link} from 'react-router-dom'
import {ReactComponent as Success} from '../../../svg/status-success.svg';
import {ReactComponent as Process} from '../../../svg/status-process.svg';
import {ReactComponent as Moderate} from '../../../svg/status-moderate.svg';
import {ReactComponent as Error} from '../../../svg/status-error.svg';
import IOrder from '../../../models/Users/IOrder';


type Props = {
    item: IOrder
}


const OrderItem: FC<Props> = ({item}) => {

    const getOrderStatus = (id: number) => {
        if (id === 4) {
            return 'Выполнена. Деньги зачислены на баланс.'
        } else if (id === 2) {
            return 'В работе. Ожидает продолжение выполнения.'
        } else if (id === 3) {
            return 'Проходит модерацию.'
        } else if (id === 5) {
            return 'Отклонена.'
        }
    }

    const getCardOrderClass = (id: number) => {
        if (id === 4) {
            return 'order-card-success';
        } else if (id === 2) {
            return 'order-card-process';
        } else if (id === 3) {
            return 'order-card-moderate';
        } else if (id === 5) {
            return 'order-card-canceled';
        }
    }

    const getIconStatus = (id: number) => {
        if (id === 4) {
            return <Success/>
        } else if (id === 2) {
            return <Process/>
        } else if (id === 3) {
            return <Moderate/>
        } else if (id === 5) {
            return <Error/>
        }
    }

    const getCardBodyClass = (id: number) => {
        if (id === 4) {
            return 'order-body-success'
        } else if (id === 2) {
            return 'order-body-process'
        } else if (id === 3) {
            return 'order-body-moderate'
        } else if (id === 5) {
            return 'order-body-canceled'
        }
    }

    const getCardIconClass = (id: number) => {
        if (id === 4) {
            return 'order-icon-success'
        } else if (id === 2) {
            return 'order-icon-process'
        } else if (id === 3) {
            return 'order-icon-moderate'
        } else if (id === 5) {
            return 'order-icon-canceled'
        }
    }

    const orderStatus = parseInt(item.status)

    if (orderStatus === 2) {
        return (
            <Col span={12}>
                <Link to={`/order/${item.id}`}>
                    <Row align={'middle'} className={`order-card ${getCardOrderClass(orderStatus)}`}>
                        <div className={`order-card-body ${getCardBodyClass(orderStatus)}`}>
                            <Col span={2}>
                                <div
                                    className={`order-icon ${getCardIconClass(orderStatus)}`}>
                                    {getIconStatus(orderStatus)}
                                </div>
                            </Col>
                            <Col span={21} className='ml10'>
                                <div className='order-title'>
                                    Заявка# {item.id}
                                </div>
                                <div className='order-card-status'>
                                    Статус: {getOrderStatus(orderStatus)}
                                </div>
                            </Col>
                        </div>
                    </Row>
                </Link>
            </Col>
        )
    } else {
        return (
            <Col span={12}>
                <Row align={'middle'} className={`order-card ${getCardOrderClass(orderStatus)}`}>
                    <div className={`order-card-body ${getCardBodyClass(orderStatus)}`}>
                        <Col span={2}>
                            <div className={`order-icon ${getCardIconClass(orderStatus)}`}>
                                {getIconStatus(orderStatus)}
                            </div>
                        </Col>
                        <Col span={21} className='ml10'>
                            <div className='order-title'>
                                Заявка# {item.id}
                            </div>
                            <div className='order-card-status'>
                                Статус: {getOrderStatus(orderStatus)}
                                {orderStatus === 5 ? `Причина: ${item.comment || 'Отмена заказа'}` : ''}
                            </div>
                        </Col>
                    </div>
                </Row>
            </Col>
        )
    }
}

export default OrderItem