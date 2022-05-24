import React, {FC} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import IDesigns from "../../../models/Admin/IDesigns";


const {Option} = Select

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
    designs: IDesigns[]
}

const BuyChannelModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish, designs}) => {
    return (
        <Modal width={751} className="admin-modal" title="Покупка канала"
               visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
            <Form name="create-request" onFinish={onFinish}>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость</div>
                        <Form.Item className="admin-input first-column-table" name="price"
                                   rules={[{required: true}]}>
                            <Input placeholder="Укажите стоимость канала"/>
                        </Form.Item>
                    </Col> <Col span={12}>
                    <div className="admin-label"> Тип контента</div>
                    <Form.Item name="type_content"
                               rules={[{required: true}]}>
                        <Select className="admin-select" placeholder="Выберите тип контента">
                            <Option value="1"> Шортс </Option>
                            <Option value="2"> Авторский </Option>
                        </Select>
                    </Form.Item>
                </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Время на выполнение</div>
                        <Form.Item name="time_to_do" className="first-column-table"
                                   rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите срок">
                                <Option value="1"> 1 час </Option>
                                <Option value="6"> 6 часов </Option>
                                <Option value="24"> 24 часа </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Оформление</div>
                        <Form.Item name="design">
                            <Select className="admin-select" placeholder="Выберите оформление">
                                {designs.map((design: IDesigns) => {
                                    return <Option key={design.id} value={design.id}> {
                                        design.category} {design.id} </Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Почта для передачи прав владельца</div>
                        <Form.Item className="admin-input first-column-table" name="email"
                                   rules={[{required: true}]}>
                            <Input placeholder="Введите адрес почты"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Бонус за выполнение</div>
                        <Form.Item name="bonus" className="admin-input">
                            <Input placeholder="Только для авторского контента*"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="form-btn">
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Отправить предложение
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BuyChannelModal;