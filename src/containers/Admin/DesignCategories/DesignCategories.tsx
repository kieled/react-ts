import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";
import {getDesignsCategories, deleteCategory, createCategory} from "../../../actions/admin";
import {layoutActions} from "../../../reducers/layout";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import DesignCategoriesList from "./DesignCategoriesList";
import CreateDesignCategoryModal from "./CreateDesignCategoryModal";


const DesignCategories: FC = () => {
    const {design_categories, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        async function onLoad() {
            document.title = 'Панель управления'
            await dispatch(getDesignsCategories())
            dispatch(layoutActions.set_name('Категории дизайнов'))
        }

        onLoad().then(() => {
            setIsLoading(false)
        })
    }, [current])

    const onFinish = async (e: any) => {
        await dispatch(createCategory(e))
        setIsModalVisible(false)
    }

    const onDelete = (id: number) => {
        dispatch(deleteCategory(id))
    }

    return (
        <>
            <Button className="new-order-btn" onClick={() => setIsModalVisible(true)}>
                Добавить категорию
            </Button>

            <CreateDesignCategoryModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                onFinish={onFinish}
            />

            <DesignCategoriesList
                setCurrent={setCurrent}
                onDelete={onDelete}
                isLoading={isLoading}
                current={current}
                count={count}
                design_categories={design_categories}
            />
        </>
    )
}

export default DesignCategories