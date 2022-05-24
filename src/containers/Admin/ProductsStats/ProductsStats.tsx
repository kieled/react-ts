import React, {useEffect, useState} from "react";
import {getStats, getPeriodStats} from "../../../actions/admin";
import {layoutActions} from "../../../reducers/layout";
import "../../../css/stats.css";
import IStats from "../../../models/Admin/IStats";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import Filters from "./Filters";
import ProductsStatusInfoModal from "./ProductsStatusInfoModal";
import ProductsStatsCounters from "./ProductsStatsCounters";
import ProductsDetailModal from "./ProductsDetailModal";
import ProductsList from "./ProductsList";


const ProductsStats = () => {
    const {stats, stats_detail} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [period, setPeriod] = useState("0")
    const [work, setWork] = useState("0",)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            dispatch(layoutActions.set_name("Анализ продаж"))
            setIsLoading(true)
            await dispatch(getPeriodStats({period, work}))
            await dispatch(getStats())
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [period, work])

    const onModal = async (id: number, type: number) => {
        const uid = stats.findIndex((obj: IStats) => obj.id === id)
        setUid(uid)
        if (type === 1) {
            setIsModalVisible(true)
        } else if (type === 2) {
            setIsDetailModalVisible(true)
        }
    }

    const onFilterPeriod = async (e: string) => {
        setPeriod(e)
    }

    const onFilterWork = async (e: string) => {
        setWork(e)
    }

    return (
        <>
            <Filters onFilterPeriod={onFilterPeriod} onFilterWork={onFilterWork}/>

            <ProductsStatsCounters stats_detail={stats_detail} />

            <ProductsList onModal={onModal}
                          stats={stats}
                          isLoading={isLoading}
            />

            <ProductsStatusInfoModal isModalVisible={isModalVisible}
                                     setIsModalVisible={setIsModalVisible}
                                     stat={stats[uid]}
            />

            <ProductsDetailModal isDetailModalVisible={isDetailModalVisible}
                                 setIsDetailModalVisible={setIsDetailModalVisible}
                                 stat={stats[uid]}
            />
        </>
    );
}


export default ProductsStats
