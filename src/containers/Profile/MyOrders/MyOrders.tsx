import React, {useEffect, useState} from 'react'
import {Row} from 'antd'
import {useNavigate} from 'react-router-dom'
import {Tabs} from 'antd'
import {
    acceptOrder,
    cancelOrder,
    load_user,
    expiredOrder,
} from '../../../actions/auth'
import IOrder from '../../../models/Users/IOrder'
import {useAppDispatch, useAppSelector} from '../../../hooks'
import OrderItem from './OrderItem';
import ChannelItem from './ChannelItem';


const {TabPane} = Tabs

const MyOrders = () => {
    const {user_orders} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function onLoad() {
            document.title = 'Мои заявки'
            await dispatch(expiredOrder())
            await dispatch(load_user())
        }

        onLoad().then(null)
    }, [])

    const onAccept = async (id: number) => {
        await dispatch(acceptOrder(id))
        navigate('/order/' + id)
    }
    
    const onCancel = async (id: number) => {
        await dispatch(cancelOrder(id))
        navigate('orders/')
    }

    return (
        <>
            <Tabs defaultActiveKey='1' size='large' className='admin-apps-tabs mobile-tabs-orders'>
                <TabPane tab='Мои заявки' key='1'>

                    <Row gutter={[16, 16]} align='middle' className='order-mobile-card-row'>
                        {user_orders
                            .filter((order: IOrder) => order.type !== '3' && order.type !== '4')
                            .map((item: IOrder) => {
                                return <OrderItem key={item.id} item={item}/>
                            })}
                    </Row>

                </TabPane>
                <TabPane tab='Запросы на покупку' key='2'>

                    {user_orders
                        .filter((order: IOrder) => order.type === '3')
                        .map((item: IOrder) => {
                            return <ChannelItem
                                onCancel={onCancel}
                                onAccept={onAccept}
                                item={item}
                                key={item.id}/>
                        })}

                </TabPane>
            </Tabs>
        </>
    )
}

export default MyOrders
