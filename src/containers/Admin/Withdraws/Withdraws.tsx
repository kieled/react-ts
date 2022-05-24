import React, {useEffect, useState} from "react"
import {Form, Tabs} from "antd"
import {getWithdraws, editWithdraw, getWorkers, getUserStatistics} from "../../../actions/admin"
import {layoutActions} from "../../../reducers/layout"
import IWithdraws from "../../../models/Admin/IWithdraws"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import Stats from "./Stats";
import WithdrawsList from "./WithdrawsList";
import DetailModal from "./DetailModal";


const Withdraws = () => {
    const {withdraws, workers, user_stats, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()
    
    
    const [id, setId] = useState<number | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)

    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            await dispatch(getUserStatistics())
            document.title = "Панель управления"
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name("Заявки на вывод"))
            setIsLoading(true)
            await dispatch(getWithdraws('', '2', '', filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ filterStatus, current ])

    const onEdit = async (e: any) => {
        e.id = id
        await dispatch(editWithdraw(e))
        setIsModalVisible(false)
    }

    const onEditModal = async (id: number) => {
        const uid = withdraws.findIndex((obj: IWithdraws) => obj.id === id)
        setId(id)
        setUid(uid)
        setIsModalVisible(true)
        form.resetFields()
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('2')
        } else if (id === '3') {
            setFilterStatus('1')
        } else if (id === '4') {
            setFilterStatus('3')
        }
    }

    return (
        <>
            <Stats user_stats={user_stats} />

            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все заявки" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="Ожидают" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Оплачены" key="3"> </Tabs.TabPane>
                <Tabs.TabPane tab="Отклоненны" key="4"> </Tabs.TabPane>
            </Tabs>

            <WithdrawsList setCurrent={setCurrent}
                           withdraws={withdraws}
                           workers={workers}
                           onEditModal={onEditModal}
                           isLoading={isLoading}
                           current={current}
                           count={count}
            />

            <DetailModal isModalVisible={isModalVisible}
                         setIsModalVisible={setIsModalVisible}
                         form={form}
                         withdraw={withdraws[uid]}
                         onEdit={onEdit}
            />

        </>
    )
}

export default Withdraws
