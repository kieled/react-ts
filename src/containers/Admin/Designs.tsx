import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Select, Row, Col, TablePaginationConfig} from "antd";
import {getDesigns, editDesign, createDesign, getDesignsCategories} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {SettingOutlined} from "@ant-design/icons";
import IDesigns from "../../models/Admin/IDesigns";
import IDesignCategories from "../../models/Admin/IDesignCategories";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Option} = Select;

function Designs() {
    const {designs, design_categories, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()


    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [id, setId] = useState<number | null>(null)
    const [uid, setUid] = useState<number | null>(null)
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
    }, [ current, status, category ])

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const onFinish = async (e: any) => {
        e.category = e.design
        await dispatch(createDesign(e))
        setIsModalVisible(false);
    };

    const onEdit = async (e: any) => {
        e.id = id
        e.category = e.design
        await dispatch(editDesign(e))
        setIsEditModalVisible(false)
    };

    const onEditModal = async (id: number) => {
        const uid = designs.findIndex(((obj: IDesigns) => obj.id === id))
        setId(id)
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields();
    };

    const onStatusFilter = (e: string) => {
        setStatus(e)
    };

    const onCategoryFilter = (e: string) => {
        setCategory(e)
    };

    const getStatus = (val: number) => {
        const status = designs.find((item: IDesigns) => item.id === val)?.status
        const id = parseInt(status || '0');
        if (id === 1) {
            return "Активно"
        } else if (id === 2) {
            return "Использовно"
        } else if (id === 3) {
            return "Зарезервировано"
        } else {
            return null
        }
    };

    const getStatusClass = (id: number) => {
        const status = parseInt(designs.find((item: IDesigns) => item.id === id)?.status || '0');
        if (status === 1) {
            return "admin-design-status-active"
        } else if (status === 2) {
            return "admin-design-status-used"
        } else if (status === 3) {
            return "admin-design-status-reserved"
        }
    }

    const getCategory = (id: number) => {
        return design_categories.find((item: IDesignCategories) => item.id === id)?.name
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            render: (id: number) => getCategory(id),
        },
        {
            title: 'Ссылка на архив',
            dataIndex: 'url',
            key: 'url',
            render: (url: string) => <a className="admin-link" href={url} target="_blank"
                                        rel="noreferrer"> {url} </a>
        },
        {
            title: 'Статус',
            dataIndex: 'id',
            key: 'x',
            className: 'admin-actions-header',
            render: (id: number) =>
                <div className="admin-action-buttons">
                    <button className="admin-action-btn" onClick={() => onEditModal(id)}>
                        <SettingOutlined/>
                    </button>
                    <div className={`admin-design-status ${getStatusClass(id)}`}>
                        {getStatus(id)}
                    </div>
                </div>
        },
    ];
    return (
        <>
            <Row>
                <Col span={6}>
                    <Select className="admin-select-filter" style={{width: '97%'}}
                            onChange={onCategoryFilter} allowClear
                            placeholder='Выберите категорию'>
                        {design_categories?.map((category: IDesignCategories) => {
                            return <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        })}
                    </Select> </Col>
                <Col span={6}>
                    <Select className="admin-select-filter"
                            style={{width: '95%'}}
                            onChange={onStatusFilter}
                            allowClear placeholder='Выберите статус'>
                        <Option key='1' value='1'> Активно </Option>
                        <Option key='2' value='2'> Использовано </Option>
                        <Option key='3' value='3'> Зарезервировано </Option>
                    </Select>
                </Col>
                <Col span={3} offset={9}>
                    <button className="admin-design-upload-btn" style={{width: '95%'}}
                            onClick={() => setIsModalVisible(true)}> Загрузить
                    </button>
                </Col>
            </Row>
            <Table tableLayout="auto"
                   sticky={true}
                   loading={isLoading}
                   pagination={{current: current, pageSize: 10, total: count}}
                   rowKey={record => record.id}
                   columns={columns}
                   dataSource={designs}
                   onChange={onPaginate}
            />
            <Modal centered width={751} className="admin-modal" title="Создание заказа"
                   visible={isModalVisible} footer={null}
                   onCancel={() => setIsModalVisible(false)}>
                <Form name="create-design" onFinish={onFinish}>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Категория</div>
                            <Form.Item name="design"
                                       rules={[{required: true}]}>
                                <Select className="admin-select" placeholder="Выберите тематику">
                                    {design_categories?.map((category: IDesignCategories) => {
                                        return <Option key={category.id}
                                                       value={category.id}> {category.name}
                                        </Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Ссылка</div>
                            <Form.Item name="url" className="admin-input">
                                <Input placeholder="Ссылка на загрузку"/>
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
            <Modal centered width={751} className="admin-modal" title="Редактирование дизайна"
                   visible={isEditModalVisible} footer={null}
                   onCancel={() => setIsEditModalVisible(false)}>
                <Form form={form} name="edit-design" onFinish={onEdit}
                      initialValues={designs ? {
                          design: designs[uid || 0]?.category,
                          url: designs[uid || 0]?.url,
                          status: designs[uid || 0]?.status
                      } : undefined}>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label"> Категория</div>
                            <Form.Item name="design" rules={[{required: true}]}>
                                <Select className="admin-select" placeholder="Выберите категорию">
                                    {design_categories?.map((category: IDesignCategories) => {
                                        return <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label">Ссылка</div>
                            <Form.Item name="url" className="first-column-table admin-input">
                                <Input placeholder="Ссылка на загрузку"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="admin-label">Статус</div>
                            <Form.Item name="status">
                                <Select className="admin-select">
                                    <Option value="1"> Активно </Option>
                                    <Option value="2"> Использовано </Option>
                                    <Option key='3' value='3'> Зарезервировано </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button className="green-btn-submit" type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Designs