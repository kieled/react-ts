import React, {FC, useEffect, useState} from "react";
import {
    getChannels, editChannel, getActualDesigns,
    buyChannel, getWorkers, deleteChannel
} from "../../../actions/admin";
import {layoutActions} from "../../../reducers/layout";
import {Tabs} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import BuyChannelModal from "./BuyChannelModal";
import ChannelsList from "./ChannelsList";
import Filters from "./Filters";

const Channels: FC = () => {
    const {channels, designs, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(true),
        [isModalVisible, setIsModalVisible] = useState(false),
        [filterWorker, setFilterWorker] = useState(''),
        [filterSearch, setSearch] = useState(''),
        [id, setId] = useState<number | null>(null),
        [filterStatus, setFilterStatus] = useState(''),
        [minSubsFilter, setMinSubsFilter] = useState(''),
        [maxSubsFilter, setMaxSubsFilter] = useState(''),
        [current, setCurrent] = useState(1)

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name('Каналы'))
            setIsLoading(true)
            await dispatch(getChannels(filterWorker, filterSearch, filterStatus, minSubsFilter, maxSubsFilter, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [filterStatus, filterSearch, filterWorker, minSubsFilter, maxSubsFilter, current])

    const onStatusChange = async (e: string, id: number) => {
        if (e === '5') {
            await dispatch(deleteChannel(id))
        } else {
            const data = {id: id, status: e}
            await dispatch(editChannel(data))
        }
    }

    const onOpenModal = async (id: number) => {
        await dispatch(getActualDesigns())
        setIsModalVisible(true)
        setId(id);
    };

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else if (id === '2') {
            setFilterStatus('1')
        } else if (id === '3') {
            setFilterStatus('3')
        }
    };

    const onFinish = async (e: any) => {
        e.id = id
        await dispatch(buyChannel(e))
        setIsModalVisible(false)
    }

    const onWorkerFilter = async (e: string) => {
        setFilterWorker(e)
    };

    const onIDFilter = async (e: string) => {
        setSearch(e)
    };

    const onFilterCount = async (type: number, value: string) => {
        if (type === 1) {
            if (isNaN(parseInt(value))) {
                setMinSubsFilter('');
            } else {
                setMinSubsFilter(value);
            }
        } else if (type === 2) {
            if (isNaN(parseInt(value))) {
                setMaxSubsFilter('');
            } else {
                setMaxSubsFilter(value);
            }
        }
    }


    return <>
        <Filters onWorkerFilter={onWorkerFilter}
                 workers={workers}
                 onIDFilter={onIDFilter}
                 onFilterCount={onFilterCount}
        />

        <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
            <Tabs.TabPane tab="Все каналы" key="1"> </Tabs.TabPane>
            <Tabs.TabPane tab="Активированные" key="2"> </Tabs.TabPane>
            <Tabs.TabPane tab="Деактивированные" key="3"> </Tabs.TabPane>
        </Tabs>

        <ChannelsList
            workers={workers}
            channels={channels}
            onOpenModal={onOpenModal}
            onStatusChange={onStatusChange}
            current={current}
            count={count}
            isLoading={isLoading}
            setCurrent={setCurrent}
        />

        <BuyChannelModal isModalVisible={isModalVisible}
                         setIsModalVisible={setIsModalVisible}
                         onFinish={onFinish}
                         designs={designs}
        />

    </>
}


export default Channels