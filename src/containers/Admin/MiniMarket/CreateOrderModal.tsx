import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd"

const {Option} = Select

type Props = {
    isNewModalVisible: boolean
    setIsNewModalVisible: (value: boolean) => void
    form: FormInstance
    onNewFinish: (vaules: any) => void
}


const CreateOrderModal: FC<Props> = ({isNewModalVisible, setIsNewModalVisible, form, onNewFinish}) => {
    return (
        <Modal centered className="admin-modal" width={751} title="Создание розничного заказа"
               visible={isNewModalVisible} footer={null}
               onCancel={() => setIsNewModalVisible(false)}>
            <Form form={form} name="new-r-order" onFinish={onNewFinish}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Тип товара</div>
                        <Form.Item name="type"
                                   rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип товара">
                                <Option value="1"> Приоритетный </Option>
                                <Option value="2"> Второстепенный </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Ссылка на канал</div>
                        <Form.Item className="admin-input first-column-table" name="url"
                                   rules={[{required: true,},]}>
                            <Input placeholder="Ссылка на канал"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость</div>
                        <Form.Item className="admin-input" name="price_by_channel"
                                   rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Тип передачи</div>
                        <Form.Item className="first-column-table" name="type_transfer"
                                   rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип передачи">
                                <Option value="1"> аккаунт </Option>
                                <Option value="2"> бренд </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Тип контента</div>
                        <Form.Item
                            name="type_content" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип контента">
                                <Option value="1"> Шортс </Option>
                                <Option value="2"> Авторский </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость $</div>
                        <Form.Item className="admin-input" name="price_usd"
                                   rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость $"/>
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

export default CreateOrderModal