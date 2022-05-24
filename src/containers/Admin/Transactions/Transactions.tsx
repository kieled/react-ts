import React, {useEffect, useState} from "react";
import {Select, DatePicker, Row, Col} from "antd";
import {getWithdraws, getWorkers} from "../../../actions/admin";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {layoutActions} from "../../../reducers/layout";
import DetailModal from "./DetailModal";
import WorkerFilter from "../../filters/WorkerFilter";
import TransList from "./TransList";


const {Option} = Select;

const Transactions = () => {
    const {withdraws, workers, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [current, setCurrent] = useState(1)
    const dateFormat = "DD.MM.YYYY";

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            await dispatch(getWorkers())
            dispatch(layoutActions.set_name("Операции с балансом"))
            setIsLoading(true)
            await dispatch(getWithdraws(author, type, date, '', current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [date, type, author, current])

    const onModal = (id: number) => {
        const uid = withdraws.findIndex((obj) => obj.id === id)
        setUid(uid)
        setIsModalVisible(true)
    }

    const onWorkerFilter = async (e: any) => {
        setAuthor(e)
    }

    const onTypeFilter = async (e: any) => {
        setType(e)
    }

    const onDateFilter = async (e: any) => {
        if (!e) {
            setDate('')
        } else {
            try {
                const date = e._d.toJSON().slice(0, 10).split("-");
                const end = date[2] + "." + date[1] + "." + date[0].slice(2, 4);
                setDate(end)
            } catch (e) {
                setDate('')
            }
        }
    }

    return (
        <>

            <Row gutter={16}>
                <Col span={4}>
                    <WorkerFilter workers={workers} onFilter={onWorkerFilter}/>
                </Col>
                <Col span={4}>
                    <Select
                        className="admin-select-filter" style={{width: "95%",}}
                        onChange={onTypeFilter} allowClear placeholder="Выберите тип">
                        <Option key="1" value="1">Пополнение</Option>
                        <Option key="2" value="2">Вывод</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <DatePicker
                        className="admin-select-filter" style={{width: "95%",}}
                        onChange={onDateFilter} format={dateFormat}/>
                </Col>
            </Row>

            <TransList workers={workers}
                       onModal={onModal}
                       current={current}
                       count={count}
                       isLoading={isLoading}
                       setCurrent={setCurrent}
                       withdraws={withdraws}
            />

            <DetailModal isModalVisible={isModalVisible}
                         setIsModalVisible={setIsModalVisible}
                         withdraw={withdraws[uid]}
                         workers={workers}
            />

        </>
    )
}

export default Transactions
