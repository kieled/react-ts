import React, {useEffect, useState} from "react";
import {Button, Form, Divider} from "antd";
import {getOrders, deleteOrders, getActualDesigns, createOrder, editOrder} from "../../../actions/admin";
import {layoutActions} from "../../../reducers/layout";
import "../../../css/admin.css";
import IOrder from "../../../models/Admin/IOrder";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import CreateEditOrderModal from "./CreateEditOrderModal";
import OrdersList from "./OrdersList";

function Orders() {
    const {orders, actualDesigns, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [btnLoading, setBtnLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            dispatch(layoutActions.set_name('Заказы'))
            setIsLoading(true)
            await dispatch(getOrders('', current))
            setIsLoading(false)
            await dispatch(getActualDesigns())
        }

        onLoad().then(null)
    }, [current])

    const onFinish = async (e: IOrder) => {
        setBtnLoading(true)
        await dispatch(createOrder(e))
        setBtnLoading(false)
        setIsModalVisible(false)
        await dispatch(getActualDesigns())
    }

    const onEdit = async (e: any) => {
        e.id = orders[uid]?.id
        if (e.max_count_subs === '') {
            e.max_count_subs = null
        }
        if (e.min_count_subs === '') {
            e.min_count_subs = null
        }
        await dispatch(editOrder(e))
        await dispatch(getOrders())
        setIsEditModalVisible(false)
    }

    const onDelete = async (id: number) => {
        await dispatch(deleteOrders(id))
        await dispatch(getActualDesigns())
    }

    const onEditModal = async (id: number) => {
        setUid(orders?.findIndex(order => order.id === id))
        setIsEditModalVisible(true)
        form.resetFields()
    }

    return (
        <>
            <Button className="new-order-btn" onClick={() => setIsModalVisible(true)}>
                Новый заказ
            </Button>

            <div className="orders-title"> Все заказы({orders?.length})</div>
            <Divider className="admin-divider"/>

            <CreateEditOrderModal actualDesigns={actualDesigns}
                                  btnLoading={btnLoading}
                                  title={'Создание заказа'}
                                  isModalVisible={isModalVisible}
                                  setIsModalVisible={setIsModalVisible}
                                  form={form}
                                  formName={'create-order'}
                                  onEdit={onFinish}
                                  order={orders[uid]}
                                  btnText={'Создать'}
            />

            <CreateEditOrderModal actualDesigns={actualDesigns}
                                  btnLoading={btnLoading}
                                  title={'Редактирование заказа'}
                                  isModalVisible={isEditModalVisible}
                                  setIsModalVisible={setIsEditModalVisible}
                                  form={form}
                                  formName={'edit-order'}
                                  onEdit={onEdit}
                                  order={orders[uid]}
                                  btnText={'Сохранить'}
            />

            <OrdersList onEditModal={onEditModal}
                        onDelete={onDelete}
                        orders={orders}
                        isLoading={isLoading}
                        current={current}
                        setCurrent={setCurrent}
                        count={count}
            />
        </>
    )
}

export default Orders