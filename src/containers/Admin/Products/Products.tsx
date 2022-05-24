import React, {useEffect, useState} from "react"
import {editProduct, getOurChannels, createChannel, getWorkers,} from "../../../actions/admin"
import {layoutActions} from "../../../reducers/layout"
import {Button, Form, Input, Row, Tabs} from "antd"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import ProductsList from "./ProductsList";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import InfoProductModal from "./InfoProductModal";

const {Search} = Input

const Products = () => {
    const {workers, our_channels, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isNewModalVisible, setIsNewModalVisible] = useState(false),
        [isStatusModalVisible, setIsStatusModalVisible] = useState(false),
        [isEditModalVisible, setIsEditModalVisible] = useState(false),
        [id, setId] = useState<number | null>(null),
        [uid, setUid] = useState<number>(0),
        [isLoading, setIsLoading] = useState(true),
        [filterSearch, setFilterSearch] = useState(''),
        [filterStatus, setFilterStatus] = useState(''),
        [current, setCurrent] = useState(1)

    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            await dispatch(getWorkers())
            await dispatch(layoutActions.set_name("Товары"))
            setIsLoading(true)
            await dispatch(getOurChannels(filterSearch, filterStatus, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [filterSearch, filterStatus, current])

    const onStatusChange = async (e: number, id: number) => {
        if (e === 2) {
            setId(id)
            setIsStatusModalVisible(true)
        } else {
            const data = {id: id, status: e}
            await dispatch(editProduct(data))
        }
    }

    const onChange = (id: string) => {
        if (id === '1') {
            setFilterStatus('')
        } else {
            setFilterStatus(`${parseInt(id) - 1}`)
        }
    }

    const onOpenModal = async (id: number) => {
        const uid = our_channels?.findIndex(((obj) => obj.id === id))
        setId(id)
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields()
    }

    const onNewFinish = async (e: any) => {
        await dispatch(createChannel(e))
        setIsNewModalVisible(false)
    }

    const onEditFinish = async (e: any) => {
        e.id = id
        await dispatch(editProduct(e))
        setIsEditModalVisible(false)
    }

    const onSellFinish = async (e: any) => {
        e.id = id
        e.status = "2"
        await dispatch(editProduct(e))
        setIsStatusModalVisible(false)
    }

    const onExpensesChange = async (e: string, id: number) => {
        const data = {
            id: id,
            expenses: e,
        }
        await dispatch(editProduct(data))
    }

    const onIDFilter = (e: string) => {
        setFilterSearch(e)
    }


    return (
        <>
            <Row>
                <Button className="new-order-btn"
                        onClick={() => setIsNewModalVisible(true)}>
                    Новый товар
                </Button>
                <Search className="admin-channels-search m0 mb-3"
                        placeholder="Введите ID или название канала" onSearch={onIDFilter}/>
            </Row>

            <Tabs type="card" className="admin-apps-tabs" defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="Все товары" key="1"> </Tabs.TabPane>
                <Tabs.TabPane tab="В продаже" key="2"> </Tabs.TabPane>
                <Tabs.TabPane tab="Проданные" key="3"> </Tabs.TabPane>
                <Tabs.TabPane tab="Архив" key="4"> </Tabs.TabPane>
                <Tabs.TabPane tab="Ожидают публикации" key="5"> </Tabs.TabPane>
            </Tabs>

            <ProductsList onExpensesChange={onExpensesChange}
                          our_channels={our_channels}
                          onOpenModal={onOpenModal}
                          setCurrent={setCurrent}
                          onStatusChange={onStatusChange}
                          current={current}
                          count={count}
                          isLoading={isLoading}
            />

            <CreateProductModal isNewModalVisible={isNewModalVisible}
                                setIsNewModalVisible={setIsNewModalVisible}
                                onNewFinish={onNewFinish}
            />

            <EditProductModal isEditModalVisible={isEditModalVisible}
                              setIsEditModalVisible={setIsEditModalVisible}
                              form={form}
                              onEditFinish={onEditFinish}
                              channel={our_channels[uid]}
                              workers={workers}
            />

            <InfoProductModal isStatusModalVisible={isStatusModalVisible}
                              setIsStatusModalVisible={setIsStatusModalVisible}
                              onSellFinish={onSellFinish}
            />

        </>
    )
}


export default Products
