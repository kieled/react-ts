import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd"
import IWorkers from "../../../models/Admin/IWorkers"
import IChannel from "../../../models/Admin/IChannel";

const {Option} = Select

type Props = {
    isEditModalVisible: boolean
    setIsEditModalVisible: (value: boolean) => void
    form: FormInstance
    onEditFinish: (values: any) => void
    channel: IChannel
    workers: IWorkers[]
}

const EditProductModal: FC<Props> = ({isEditModalVisible, setIsEditModalVisible, form, onEditFinish, channel, workers}) => {
    return (
        <Modal
            centered
            width={751}
            className="admin-modal"
            title="Редактирование товара"
            visible={isEditModalVisible}
            onCancel={() => setIsEditModalVisible(false)}
            footer={null}
        >
            <Form
                form={form}
                name="edit-channel"
                onFinish={onEditFinish}
                initialValues={channel}
            >
                    <Row>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Название</div>
                                    <div className="admin-psevdo-input">

                                        {channel?.name}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Ссылка на канал</div>
                                    <div className="admin-psevdo-input">
                                        <a className="admin-link" target="_blank"
                                           rel="noreferrer" href={channel?.url}
                                        >
                                            Открыть канал
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="admin-label"> Аудитория чел</div>
                                    <div className="admin-psevdo-input">
                                        {channel?.subs}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="admin-label"> Сотрудник</div>
                                    <div className="admin-psevdo-input">
                                        {channel?.worker
                                            ? workers.find(
                                                (worker: IWorkers) =>
                                                    worker.id ===
                                                    channel?.worker
                                            )?.name
                                            : "-"}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Дата покупки</div>
                        <Form.Item
                            className="first-column-table admin-input"
                            name="date_buy"
                        >
                            <Input placeholder="Дата покупки"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Дата продажи</div>
                        <Form.Item name="date_sell" className="admin-input">
                            <Input placeholder="Дата продажи"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Закупочная стоимость</div>
                        <Form.Item
                            name="price"
                            className="admin-input first-column-table"
                        >
                            <Input placeholder="Закупочная стоимость"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Расходы на товар</div>
                        <Form.Item name="expenses" className="admin-input">
                            <Input placeholder="Расходы на товар"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Продажа</div>
                        <Form.Item
                            name="price_sell"
                            className="admin-input first-column-table"
                        >
                            <Input placeholder="Продажа"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Чистая прибыль</div>
                        <Form.Item name="profit" className="admin-input">
                            <Input placeholder="Чистая прибыль"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Где был продан</div>
                        <Form.Item name="workstation">
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
                <Form.Item>
                    <Button className="green-btn-submit mb-2 mt-2" type="primary" htmlType="submit">
                        Обновить информацию
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditProductModal