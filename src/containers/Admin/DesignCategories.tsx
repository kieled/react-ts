import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Row, Col, TablePaginationConfig} from "antd";
import {getDesignsCategories, deleteCategory, createCategory} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {DeleteOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../hooks";


const DesignCategories = () => {
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

        onLoad().then(() => {setIsLoading(false)})
    }, [ current ])

    const onFinish = async (e: any) => {
        await dispatch(createCategory(e))
        setIsModalVisible(false)
    }

    const onDelete = (id: number) => {
        dispatch(deleteCategory(id))
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Имя категории',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'x',
            render: (id: number) => (
                <div className="admin-action-buttons">
                    <Button className="admin-action-btn" icon={<DeleteOutlined/>}
                            onClick={() => onDelete(id)}/>
                </div>),
        },
    ]

    return (
        <>
            <Button className="new-order-btn" onClick={() => setIsModalVisible(true)}>
                Добавить категорию
            </Button> <
            Modal width={751} centered className="admin-modal" title="Создание катеригории"
                  visible={isModalVisible} footer={null}
                  onCancel={() => setIsModalVisible(false)}>
            <Form name="create-design" onFinish={onFinish}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Имя категории</div>
                        <Form.Item name="name" className="admin-input">
                            <Input placeholder="Введите имя"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
            <Table tableLayout="auto"
                   sticky={true}
                   columns={columns}
                   rowKey={item => item.id}
                   loading={isLoading}
                   onChange={onPaginate}
                   pagination={{current: current, pageSize: 10, total: count}}
                   dataSource={design_categories}/>
        </>
    )
}

export default DesignCategories