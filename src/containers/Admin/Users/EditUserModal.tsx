import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Switch} from "antd"
import IUser from "../../../models/Admin/IUser"

type Props = {
    isEditModalVisible: boolean
    setIsEditModalVisible: (value: boolean) => void
    form: FormInstance
    onEdit: (values: any) => void
    user: IUser
    onChange: (values: any) => void
    onDelete: () => void
}

const EditUserModal: FC<Props> = ({
                           isEditModalVisible,
                           setIsEditModalVisible,
                           form,
                           onEdit,
                           user,
                           onChange,
                           onDelete
                       }) => {
    return (
        <Modal
            className="admin-modal"
            centered
            width={751}
            title="Редактирование пользователя"
            visible={isEditModalVisible}
            footer={null}
            onCancel={() => setIsEditModalVisible(false)}
        >
            <Form
                form={form}
                name="edit-order"
                onFinish={onEdit}
                initialValues={user}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Имя и фамилия</div>
                        <Form.Item
                            className="admin-input"
                            name="name"
                            rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Логин</div>
                        <div className="admin-psevdo-input">
                            {user?.username}
                        </div>
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
                        <div className="admin-label">Дата добавления в базу</div>
                        <div className="admin-psevdo-input">
                            {user?.date_joined}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Чисто продаж</div>
                        <Form.Item className="admin-input" name="count_trades">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Сумма продаж</div>
                        <Form.Item
                            className="admin-input first-column-table"
                            name="sum_trades">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Текущий баланс</div>
                        <Form.Item className="admin-input" name="balance">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Замороженный баланс</div>
                        <Form.Item
                            className="admin-input first-column-table"
                            name="hold_balance">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">
                            Является ли аккаунт замороженным
                        </div>
                        <Form.Item className="admin-input" name="hold">
                            <Switch
                                onChange={onChange}
                                checked={user?.hold}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        className="green-btn-submit mt-2"
                        type="primary"
                        htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div
                        className="admin-delete-user-btn"
                        onClick={() => onDelete()}>
                        <span>Удалить профиль</span>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUserModal