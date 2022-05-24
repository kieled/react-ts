import React, {FC} from 'react'
import {Button, Col, Row} from 'antd'
import {YoutubeFilled} from '@ant-design/icons'
import IOrder from '../../../models/Users/IOrder'

type Props = {
    onAccept: (id: number) => void
    onCancel: (id: number) => void
    item: IOrder
}

const ChannelItem: FC<Props> = ({
                                    onAccept,
                                    onCancel,
                                    item
                                }) => {

    const getChannelStatus = (id: number) => {
        if (id === 4) {
            return 'Выполнено'
        } else if (id === 5) {
            return 'Отклонено'
        } else if (id === 6) {
            return 'Просрочено'
        }
    }

    const getCardYTClass = (id: number) => {
        if (id === 4) {
            return 'yt-card-success'
        } else if (id === 1) {
            return 'yt-card-process'
        } else if (id === 6) {
            return 'yt-card-expired'
        } else if (id === 5) {
            return 'yt-card-canceled'
        }
    }

    const getBtnYTClass = (id: number) => {
        if (id === 6) {
            return 'expired-yt-btn'
        } else if (id === 5) {
            return 'canceled-yt-btn'
        } else if (id === 4) {
            return 'success-yt-btn'
        }
    }

    const getYTIconClass = (id: number) => {
        if (id === 6) {
            return 'expired-yt-icon'
        } else if (id === 5) {
            return 'canceled-yt-icon'
        } else if (id === 4) {
            return 'success-yt-icon'
        } else if (id === 1) {
            return 'process-yt-icon'
        }
    }

    return (
        <Row align='middle'
             className={`yt-card ${getCardYTClass(parseInt(item.status))}`}>
            <Col span={1} className='ml-15px'>
                <YoutubeFilled style={{fontSize: '44px'}}
                               className={getYTIconClass(parseInt(item.status))}
                />
            </Col>
            <Col span={3} className='ml20'>
                <div>Название</div>
                <div className='bold-text'>{item.channel?.name}</div>
            </Col>
            <Col span={3}>
                <div>Аудитория</div>
                <div className='bold-text'>{item.channel?.subs}</div>
            </Col>
            <Col span={3}>
                <div>Контент</div>
                <div className='bold-text'>{item.type_content}</div>
            </Col>
            <Col span={3}>
                <div>Сумма</div>
                <div className='bold-text'>
                    {item.price_by_channel}₽
                </div>
            </Col>
            <Col span={3}>
                <a className='yt-link' href={item.channel?.url}>
                    открыть канал
                </a>
            </Col>
            <Col span={3}>
                {item.status === '1' && (
                    <Button className='cancel-yt-btn' onClick={() => onCancel(item.id)}>
                        <div className='white-status-text'>
                            Отклонить
                        </div>
                    </Button>
                )}
            </Col>
            <Col span={3} className='ml10'>
                {item.status === '1' ? (
                    <Button className='agree-yt-btn' onClick={() => onAccept(item.id)}>
                        Принять
                    </Button>
                ) : (
                    <Button className={getBtnYTClass(parseInt(item.status))}>
                        <div className='white-status-text'>
                            {getChannelStatus(parseInt(item.status))}
                        </div>
                    </Button>
                )}
            </Col>
        </Row>
    )
}

export default ChannelItem