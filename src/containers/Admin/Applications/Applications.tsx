import React, {FC, useEffect, useState} from 'react';
import {Form, Tabs, Row} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {editApp, getApps, getWorkers} from '../../../actions/admin';
import {layoutActions} from '../../../reducers/layout';
import AppStatusModal from "./AppStatusModal";
import AppsList from "./AppsList";
import WorkerFilter from "../../filters/WorkerFilter";


const {TabPane} = Tabs;

const Applications: FC = () => {
    const {apps, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [uid, setUid] = useState<number>(0)
    const [filterUser, setFiletUser] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [current, setCurrent] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            await dispatch(getWorkers())
            await dispatch(layoutActions.set_name('Заявки'))
            setIsLoading(true)
            await dispatch(getApps(filterUser, filterStatus, current))
            setIsLoading(false)
            document.title = 'Панель управления'

        }

        onLoad().then(null)

    }, [filterUser, filterStatus, current])

    const onChange = (id: string) => {
        if (id !== '1') {
            setCurrent(1)
            setFilterStatus(id)
        } else {
            setCurrent(1)
            setFilterStatus('')
        }
    }

    const onFinish = async (values: any) => {
        const data = {...values, id: apps[uid]?.id}
        await dispatch(editApp(data))
        setIsModalVisible(false)
    }

    const onFilter = async (userId: string) => {
        setCurrent(1)
        setFiletUser(userId)
    }

    const onOpenModal = (id: number) => {
        setUid(apps?.findIndex(((obj) => obj.id === id)) || 0);
        setIsModalVisible(true);
        form.resetFields();
    }

    return (
        <>
            <Row>
                <WorkerFilter workers={workers} onFilter={onFilter}/>
            </Row>
            <Tabs type='card' className='admin-apps-tabs' defaultActiveKey='1' onChange={onChange}>
                <TabPane tab='Все заявки' key='1'> </TabPane>
                <TabPane tab='В процессе' key='2'> </TabPane>
                <TabPane tab='На модерации' key='3'> </TabPane>
                <TabPane tab='Выполненные' key='4'> </TabPane>
                <TabPane tab='Отклоненные' key='5'> </TabPane>
            </Tabs>

            <AppsList
                workers={workers}
                setCurrent={setCurrent}
                current={current}
                apps={apps}
                isLoading={isLoading}
                onOpenModal={onOpenModal}
                count={count} />

            <AppStatusModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onFinish={onFinish}
                app={apps[uid]}
                form={form}
                workers={workers}/>
        </>
    )
}


export default Applications