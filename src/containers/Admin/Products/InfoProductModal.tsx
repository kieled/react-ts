import React, {FC} from 'react'
import {Button, Col, Form, Input, Modal, Row, Select} from "antd"

const {Option} = Select

type Props = {
    isStatusModalVisible: boolean
    setIsStatusModalVisible: (value: boolean) => void
    onSellFinish: (values: any) => void
}

const InfoProductModal: FC<Props> = ({isStatusModalVisible, setIsStatusModalVisible, onSellFinish}) => {
    return (
        <Modal
            className="admin-modal"
            centered
            width={751}
            title="Доп информация"
            visible={isStatusModalVisible}
            onCancel={() => setIsStatusModalVisible(false)}
            footer={null}
        >
            <Form name="sell-channel" onFinish={onSellFinish}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="workstation"
                            rules={[{required: true}]}
                        >
                            <Select
                                className="admin-select"
                                placeholder="Где был продан товар"
                            >
                                <Option value="1"> Trade Groups </Option>
                                <Option value="2"> Accs Market </Option>
                                <Option value="3"> Garant Market </Option>
                                <Option value="4"> Fun Pay </Option>
                                <Option value="5"> Другие </Option>
                                <Option value="6"> Партнёры </Option>
                                <Option value="7"> Mini Market </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="date_sell"
                            className="admin-input"
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Дата продажи"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="price_sell"
                            className="admin-input"
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Цена продажи"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Продолжить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default InfoProductModal