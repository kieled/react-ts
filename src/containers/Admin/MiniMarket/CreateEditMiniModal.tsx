import React, {FC} from 'react';
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd";

const {Option} = Select

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
    title: string
    btnText: string
    formName: string
    form: FormInstance | undefined
}

const CreateEditMiniModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish, title, btnText, formName, form}) => {
    const TableBody = (item = "") => {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Тип товара</div>
                        <Form.Item name="type" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип товара">
                                <Option value="1"> Приоритетный </Option>
                                <Option value="2"> Второстепенный </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Кол-во подписчиков</div>
                        <Row>
                            <Col span={12}>
                                <Form.Item className="admin-input first-column-table"
                                           name="min_count_subs">
                                    <Input placeholder="От"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className="admin-input first-column-table"
                                           name="max_count_subs">
                                    <Input placeholder="До"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Количество каналов</div>
                        <Form.Item
                            className="admin-input"
                            name="count"
                            rules={[{required: true,},]}>
                            <Input placeholder="Введите число"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Тип передачи</div>
                        <Form.Item className="first-column-table"
                                   name="type_transfer" rules={[{required: true}]}>
                            <Select className="admin-select" placeholder="Выберите тип передачи">
                                <Option value="1">аккаунт</Option>
                                <Option value="2">бренд</Option>
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
                        <div className="admin-label"> Стоимость</div>
                        <Form.Item className="admin-input first-column-table"
                                   name="price_by_channel" rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Стоимость $</div>
                        <Form.Item className="admin-input first-column-table"
                                   name="price_usd" rules={[{required: true}]}>
                            <Input placeholder="Введите стоимость $"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        {item}
                    </Button>
                </Form.Item>
            </>
        );
    }

    return (
        <Modal centered className="admin-modal" width={751} title={title}
               visible={isModalVisible} footer={null}
               onCancel={() => setIsModalVisible(false)}>
            <Form form={form} name={formName} onFinish={onFinish}>
                {TableBody(btnText)}
            </Form>
        </Modal>
    );
};

export default CreateEditMiniModal;