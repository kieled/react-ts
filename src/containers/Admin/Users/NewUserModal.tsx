import React, {FC} from 'react'
import {Button, Col, Form, Input, Modal, Row} from "antd"

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
}

const NewUserModal: FC<Props> = ({
                          isModalVisible,
                          setIsModalVisible,
                          onFinish
                      }) => {
    return (
        <Modal
            className="admin-modal"
            centered
            width={751}
            title="Новый сотрудник"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
        >
            <Form name="create-user" onFinish={onFinish}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label">Имя и фамилия</div>
                        <Form.Item
                            name="name"
                            className="admin-input"
                            rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Логин</div>
                        <Form.Item
                            name="username"
                            className="admin-input first-column-table"
                            rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Пароль</div>
                        <Form.Item
                            name="password_visible"
                            className="admin-input"
                            rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Чисто продаж(необязательно)</div>
                        <Form.Item name="count_trades first-column-table"
                                   className="admin-input">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit mt-3 mb-2"
                            type="primary" htmlType="submit"
                    >Добавить сотрудника</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewUserModal