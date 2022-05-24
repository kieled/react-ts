import React, {FC, useEffect, useState} from "react"
import {Form} from "antd"
import {getDesigns, editDesign, createDesign, getDesignsCategories} from "../../../actions/admin"
import {layoutActions} from "../../../reducers/layout"
import IDesigns from "../../../models/Admin/IDesigns"
import IDesignCategories from "../../../models/Admin/IDesignCategories"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import DesignFilters from "./DesignFilters";
import DesignsList from "./DesignsList";
import CreateDesignCategoryModal from "../DesignCategories/CreateDesignCategoryModal";
import EditDesignModal from "./EditDesignModal";


const Designs: FC = () => {
    const {designs, design_categories, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
    const [category, setCategory] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [current, setCurrent] = useState(1)
    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            await dispatch(getDesignsCategories())
            dispatch(layoutActions.set_name('Дизайн каналов'))
            setIsLoading(true)
            await dispatch(getDesigns(category, status, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [current, status, category])

    const onFinish = async (e: any) => {
        e.category = e.design
        await dispatch(createDesign(e))
        setIsModalVisible(false)
    }

    const onEdit = async (e: any) => {
        e.id = designs[uid].id
        e.category = e.design
        await dispatch(editDesign(e))
        setIsEditModalVisible(false)
    }

    const onEditModal = async (id: number) => {
        const uid = designs.findIndex(((obj: IDesigns) => obj.id === id))
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields()
    }

    const onStatusFilter = (status: string) => {
        setStatus(status)
    }

    const onCategoryFilter = (category: string) => {
        setCategory(category)
    }

    const getCategory = (id: number): string => {
        return design_categories.find((item: IDesignCategories) => item.id === id)?.name || ''
    }

    return <>
            <DesignFilters onCategoryFilter={onCategoryFilter}
                           design_categories={design_categories}
                           onStatusFilter={onStatusFilter}
                           setIsModalVisible={setIsModalVisible}/>
            <DesignsList designs={designs}
                         getCategory={getCategory}
                         onEditModal={onEditModal}
                         setCurrent={setCurrent}
                         isLoading={isLoading}
                         current={current}
                         count={count}/>
            <CreateDesignCategoryModal isModalVisible={isModalVisible}
                                       setIsModalVisible={setIsModalVisible}
                                       onFinish={onFinish} />
            <EditDesignModal isEditModalVisible={isEditModalVisible}
                             setIsEditModalVisible={setIsModalVisible}
                             form={form}
                             design={designs[uid]}
                             onEdit={onEdit}
                             design_categories={design_categories} />
        </>
}

export default Designs