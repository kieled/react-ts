import React, {FC} from 'react'
import {Button, Col, Form, Input, Modal, Row, Select} from "antd"
import IDesignCategories from "../../../models/Admin/IDesignCategories"

const {Option} = Select

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
    design_categories: IDesignCategories[]
}

const CreateDesignModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish, design_categories}) => {
    return (
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
    )
}

export default CreateDesignModal