import React, {FC} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";

const {Option} = Select

type Props = {
    isNewModalVisible: boolean
    setIsNewModalVisible: (value: boolean) => void
    onNewFinish: (values: any) => void
}

const CreateProductModal: FC<Props> = ({isNewModalVisible, setIsNewModalVisible, onNewFinish}) => {
    return (
        <Modal
            width={751}
            className="admin-modal"
            title="Новый товар"
            visible={isNewModalVisible}
            onCancel={() => setIsNewModalVisible(false)}
            footer={null}
        >
            <Form name="new-channel" onFinish={onNewFinish}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Ссылка на канал</div>
                        <Form.Item className="admin-input" name="url" rules={[{required: true}]}>
                            <Input placeholder="введите ссылку на канал"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> ЗС</div>
                        <Form.Item
                            className="admin-input first-column-table"
                            name="price"
                            rules={[{required: true}]}
                        >
                            <Input placeholder="сумма"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> РНТ</div>
                        <Form.Item name="expenses" className="admin-input">
                            <Input placeholder="сумма"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Дата покупки</div>
                        <Form.Item name="date_buy"
                                   className="admin-input first-column-table">
                            <Input placeholder="25.01.2022"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Тип покупки</div>
                        <Form.Item
                            name="type"
                            rules={[{required: true}]}
                        >
                            <Select className="admin-select" placeholder="Выберите тип">
                                <Option value="1"> Внутренняя покупка </Option>
                                <Option value="2"> Внешняя покупка </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit mt-2 mb-2" type="primary" htmlType="submit">
                        Добавить товар
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProductModal;