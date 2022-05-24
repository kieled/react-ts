import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd"
import IWithdraws from "../../../models/Admin/IWithdraws";

const {Option} = Select

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    form: FormInstance
    withdraw: IWithdraws
    onEdit: (values: any) => void
}


const DetailModal: FC<Props> = ({
                         isModalVisible,
                         setIsModalVisible,
                         form,
                         withdraw,
                         onEdit
                     }) => {
    return (
        <Modal
            centered
            width={751}
            className="admin-modal"
            title="Статус заявки на вывод"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}>
            <Form
                form={form}
                name="edit-withdraw"
                initialValues={withdraw}
                onFinish={onEdit}
            >

                <>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label">Платежная система</div>
                            <div className="admin-psevdo-input first-column-table">
                                {withdraw?.type_withdraw}
                            </div>

                        </Col>
                        <Col span={12}>
                            <div className="admin-label">Реквизиты</div>
                            <div className="admin-psevdo-input admin-copiable">
                                {withdraw?.credentials}
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="admin-label">Дополнительные реквизиты</div>
                            <div className="admin-psevdo-input admin-copiable w100">
                                {withdraw?.credentials_name !== null
                                    ? withdraw?.credentials_name : "-"}
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="admin-label"> Сумма</div>

                            <div className="admin-psevdo-input admin-copiable">
                                {withdraw?.sum}
                            </div>

                        </Col>
                        <Col span={12}>
                            <div className="admin-label"> Статус</div>
                            <Form.Item name="status">
                                <Select className="admin-select">
                                    <Option value="2"> Ожидает </Option>
                                    <Option value="1"> Оплачено </Option>
                                    <Option value="3"> Отклонено </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Коментарий</div>

                        <Form.Item name="comment">
                            <Input.TextArea rows={4} className="admin-text-area"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        className="green-btn-submit"
                        type="primary"
                        htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DetailModal