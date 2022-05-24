import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd"
import IDesignCategories from "../../../models/Admin/IDesignCategories"
import IDesigns from "../../../models/Admin/IDesigns";

const {Option} = Select

type Props = {
    isEditModalVisible: boolean
    setIsEditModalVisible: (value: boolean) => void
    form: FormInstance
    design: IDesigns | undefined
    onEdit: (values: any) => void
    design_categories: IDesignCategories[]
}

const EditDesignModal: FC<Props> = ({isEditModalVisible, setIsEditModalVisible, form, design, onEdit, design_categories}) => {
    return (
        <Modal centered width={751} className="admin-modal" title="Редактирование дизайна"
               visible={isEditModalVisible} footer={null}
               onCancel={() => setIsEditModalVisible(false)}>
            <Form form={form} name="edit-design" onFinish={onEdit}
                  initialValues={{
                      design: design?.category,
                      url: design?.url,
                      status: design?.status
                  }}>
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
    )
}

export default EditDesignModal