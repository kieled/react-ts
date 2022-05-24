import React, {FC, useEffect, useState} from "react";
import {Form, Row, Tabs} from "antd";
import {
    getMiniOrders, editMiniOrder, createMiniOrder, getValues,
    editValues, getUsdValues, editUsdValues,
} from "../../../actions/admin";
import {layoutActions} from "../../../reducers/layout";
import IOrder from "../../../models/Admin/IOrder";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import EditValuesModal from "./EditValuesModal";
import CreateEditMiniModal from "./CreateEditMiniModal";
import CreateOrderModal from "./CreateOrderModal";
import BtnOpenModal from "./btnOpenModal";
import MiniList from "./MiniList";


const MiniMarket: FC = () => {
    const {mini_orders, values, usd_values, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isValuesModalVisible, setIsValuesModalVisible] = useState(false)
    const [isValuesUsdModalVisible, setIsValuesUsdModalVisible] = useState(false)
    const [isNewModalVisible, setIsNewModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)
    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            await dispatch(getValues())
            await dispatch(getUsdValues())
            dispatch(layoutActions.set_name("Mini market"))
            setIsLoading(true)
            await dispatch(getMiniOrders(filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [filterStatus])

    const onFinish = async (e: any) => {
        e.is_mini = true
        e.type_mini = "1"
        await dispatch(createMiniOrder(e))
        setIsModalVisible(false)
    }



    const onNewFinish = async (e: any) => {
        e.is_mini = true
        e.type_mini = "2"
        await dispatch(createMiniOrder(e))
        setIsNewModalVisible(false)
    }

    const onValuesFinish = async (e: any) => {
        await dispatch(editValues(e))
        setIsValuesModalVisible(false)
    }

    const onUsdValuesFinish = async (e: any) => {
        await dispatch(editUsdValues(e))
        setIsValuesUsdModalVisible(false)
    }

    const onEdit = async (e: any) => {
        e.id = mini_orders[uid].id;
        if (e.max_count_subs === "") {
            e.max_count_subs = null
        }
        if (e.min_count_subs === "") {
            e.min_count_subs = null
        }
        await dispatch(editMiniOrder(e))
        setIsEditModalVisible(false)
    }

    const onStatusChange = async (e: any, id: number) => {
        await dispatch(editMiniOrder({id: id, status: e}))
    }

    const onEditModal = (id: number) => {
        setUid(mini_orders.findIndex((order: IOrder) => order.id === id))
        setIsEditModalVisible(true)
        form.resetFields();
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('1')
        } else if (id === '3') {
            setFilterStatus('2')
        }
    }

    return (
        <>
            <Row>
                <BtnOpenModal text={'Новый оптовый заказ'} onClick={setIsModalVisible} />
                <BtnOpenModal text={'Новый розничный заказ'} onClick={setIsNewModalVisible} />
                <BtnOpenModal text={'Редактор цен'} onClick={setIsValuesModalVisible} />
                <BtnOpenModal text={'$ Редактор цен $'} onClick={setIsValuesUsdModalVisible} />
            </Row>

            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все заявки" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="Оптовые" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Розничные" key="3"> </Tabs.TabPane>
            </Tabs>

            <MiniList mini_orders={mini_orders}
                      onStatusChange={onStatusChange}
                      onEditModal={onEditModal}
                      isLoading={isLoading}
                      current={current}
                      count={count}
                      setCurrent={setCurrent}
            />

            <CreateEditMiniModal
                isModalVisible={isEditModalVisible}
                setIsModalVisible={setIsEditModalVisible}
                onFinish={onEdit}
                title={"Редактирование товара"}
                btnText={"edit-order"}
                formName={"Сохранить"}
                form={form}
            />

            <CreateEditMiniModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onFinish={onFinish}
                title="Создание заказа"
                btnText="create-order"
                formName="Добавить"
                form={undefined}
            />

            <CreateOrderModal isNewModalVisible={isNewModalVisible}
                              setIsNewModalVisible={setIsModalVisible}
                              form={form}
                              onNewFinish={onNewFinish}
            />

            <EditValuesModal
                isModalVisible={isValuesModalVisible}
                setIsModalVisible={setIsValuesModalVisible}
                onFinish={onValuesFinish}
                values={values}
                title="Редактор цен"
                formName="edit-values"
            />
            <EditValuesModal
                isModalVisible={isValuesUsdModalVisible}
                setIsModalVisible={setIsValuesUsdModalVisible}
                onFinish={onUsdValuesFinish}
                values={usd_values}
                title="Редактор цен $"
                formName="edit-values-dollar"
            />
        </>
    )
}

export default MiniMarket