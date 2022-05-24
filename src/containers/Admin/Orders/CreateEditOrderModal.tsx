import React, {FC} from 'react'
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd"
import IActualDesigns from "../../../models/Admin/IActualDesigns"
import IOrder from "../../../models/Admin/IOrder";

const {Option} = Select


type Props = {
    actualDesigns: IActualDesigns[]
    btnLoading: boolean
    title: string
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    form: FormInstance
    formName: string
    onEdit: (values: any) => void
    order: IOrder
    btnText: string
}

const CreateEditOrderModal: FC<Props> = ({
                                             actualDesigns,
                                             btnLoading,
                                             title,
                                             isModalVisible,
                                             setIsModalVisible,
                                             form,
                                             formName,
                                             onEdit,
                                             order,
                                             btnText
                                         }) => {
    const FormBody = (text: string) => {
        return (<>
                <Row>
                    <Col span={24}>
                        <div className="admin-label">Тип заказа</div>
                        <Form.Item name="type"
                                   rules={[{required: true, message: 'Выберите тип заказа'}]}>
                            <Select className="admin-select" placeholder="Выберите тип заказа">
                                <Option value="1">Приоритетный</Option>
                                <Option value="2">Второстепенный</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Кол-во подписчиков</div>
                        <Row className="align-items-end">
                            <Col span={11}>
                                <Form.Item className="admin-input"
                                           name="min_count_subs">
                                    <Input placeholder="От"/>
                                </Form.Item> </Col>
                            <Col span={11} offset={1}>
                                <Form.Item className="admin-input" name="max_count_subs">
                                    <Input placeholder="До"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Время на выполнение</div>
                        <Form.Item name="time_to_do"
                                   rules={[{required: true, message: 'Выберите время выполнения'}]}>
                            <Select className="admin-select" placeholder="Выберите срок">
                                <Option value="1"> 1 час </Option>
                                <Option value="6"> 6 часов </Option>
                                <Option value="24"> 24 часа </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Цена за подписчика</div>
                        <Form.Item name="price_by_subs" className="first-column-table admin-input"
                                   rules={[{required: true}]}>
                            <Input placeholder="Введите цену за подписчика"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Тип контента</div>
                        <Form.Item name="type_content" rules={[{required: true, message: 'Выберите тип контента'}]}>
                            <Select className="admin-select"
                                    placeholder="Выберите тип контента">
                                <Option value="1"> Шортс </Option>
                                <Option value="2"> Авторский </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Модерация</div>
                        <Form.Item name="moderation" className="first-column-table"
                                   rules={[{required: true, message: 'Выберите тип модерации'}]}>
                            <Select className="admin-select" placeholder="Выберите тип модерации">
                                <Option value="1"> Быстрая </Option>
                                <Option value="2"> До двух дней </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Почта для передачи прав владельца</div>
                        <Form.Item className="admin-input" name="email"
                                   rules={[{required: true, message: 'Введите адрес почты'}]}>
                            <Input placeholder="Введите адрес почты"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Оформление</div>
                        <Form.Item name="design" className="first-column-table">
                            <Select className="admin-select" placeholder="Выберите категорию">
                                {actualDesigns?.map((design: IActualDesigns) => {
                                    return <Option key={design.id} value={design.id}>
                                        {design.category} {design.id}
                                    </Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Бонус за выполнение</div>
                        <Form.Item className="admin-input" name="bonus">
                            <Input placeholder="Только для авторского контента*"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="form-btn">
                    <Button loading={btnLoading} className="green-btn-submit"
                            type="primary" htmlType="submit"> {text}
                    </Button>
                </Form.Item>
            </>
        )
    }

    const values = order ? {
        type: order?.type,
        min_count_subs: order?.min_count_subs,
        max_count_subs: order?.max_count_subs,
        price_by_subs: order?.price_by_subs,
        moderation: order?.moderation,
        email: order?.email,
        time_to_do: order?.time_to_do?.toString(),
        type_content: order?.type_content,
        design: order?.design?.toString(),
        bonus: order?.bonus
    } : undefined

    return (
        <div>
            <Modal centered className="admin-modal" width={751} title={title}
                   visible={isModalVisible} footer={null}
                   onCancel={() => setIsModalVisible(false)}>
                <Form requiredMark={false} form={form} name={formName} onFinish={onEdit}
                      initialValues={values}>
                    {FormBody(btnText)}
                </Form>
            </Modal>
        </div>
    )
}

export default CreateEditOrderModal