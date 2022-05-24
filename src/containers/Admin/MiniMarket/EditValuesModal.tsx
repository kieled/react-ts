import React, {FC} from 'react'
import {Button, Col, Form, Input, Modal, Row} from "antd"
import IValues from "../../../models/Admin/IValues"
import {MinusCircleOutlined} from "@ant-design/icons"

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
    values: IValues[]
    title: string
    formName: string
}


const EditValuesModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish, values, title, formName}) => {
    const ListFormBody = () => {
        return (
            <>
                <Form.List name='values'>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Row key={key}>
                                    <Col span={12}>
                                        <div className="admin-label"> Кол - во подписчиков</div>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, "min"]}
                                                           rules={[{required: true}]}
                                                           className="admin-input first-column-table">
                                                    <Input placeholder="От"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, "max"]}
                                                           rules={[{required: true}]}
                                                           className="admin-input first-column-table">
                                                    <Input placeholder="До"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={11}>
                                        <div className="admin-label"> Цена</div>
                                        <Form.Item {...restField} name={[name, "price"]}
                                                   rules={[{required: true}]} className="admin-input">
                                            <Input placeholder="Введите цену"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        <MinusCircleOutlined className="admin-minus-btn-editor"
                                                             onClick={() => remove(name)}/>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col span={6}>
                                    <Form.Item className="justify-content-start">
                                        <Button className="admin-add-new-editor-price"
                                                onClick={() => add()}>
                                            Добавить фильтр
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </>
        )
    }
    
    return (
        <Modal centered className="admin-modal" width={664} title={title}
               visible={isModalVisible} footer={null}
               onCancel={() => setIsModalVisible(false)}>
            <Form name={formName} onFinish={onFinish} autoComplete="off"
                  initialValues={{values}}>
                {ListFormBody()}
            </Form>
        </Modal>
    )
}

export default EditValuesModal