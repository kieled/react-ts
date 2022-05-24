import React, {FC} from 'react'
import {Col, Form, FormInstance, Input, Row, Select} from "antd"

const {Option} = Select

type Props = {
    form: FormInstance
    onFinish: (values: any) => void
    onMin: (value: number) => void
}

const WithdrawForm: FC<Props> = ({
                                     form,
                                     onFinish,
                                     onMin
                                 }) => {
    const layout = {labelCol: {span: 8}, wrapperCol: {span: 16},}
    return (
        <Col span={16} className="mobile-withdraw-block">
            <div className="withdraw mobile-withdraw">
                <h1 className="form-title"> Вывод средств </h1>
                <Form
                    form={form}
                    {...layout}
                    name="withdraw"
                    onFinish={onFinish}
                >
                    <Row className="mobile-row">
                        <Col span={8}>
                            <Form.Item
                                className="w120"
                                name="sum"
                                rules={[{required: true, message: "Введите сумму"}]}
                            >
                                <Input
                                    className="with-input"
                                    placeholder="Сумма"
                                    suffix="₽"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                className="w120"
                                name="credentials"
                                rules={[{required: true, message: "Введите реквизиты"}]}
                            >
                                <Input
                                    className="with-input reqwithints"
                                    placeholder="Реквизиты"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                className="w120"
                                name="type_withdraw"
                                rules={[{required: true,message: "Выберите платежную систему"}]}
                            >
                                <Select
                                    className="with-select select-mobile"
                                    placeholder="Платежная система"
                                    onChange={onMin}
                                >
                                    <Option value="1">Qiwi(0-1%)</Option>
                                    <Option value="2">Юmoney(3%)</Option>
                                    <Option value="3">Сбербанк</Option>
                                    <Option value="8">Тинькофф</Option>
                                    <Option value="4">Карта банка РБ (2 BYN)</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="mobile-row">
                        <Col span={16}>
                            <Form.Item className="w123" name="credentials_name">
                                <Input
                                    className="with-input"
                                    placeholder="Примечание (ФИО: при выводе на карту, и др)"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                className="w120"
                                name="speed_withdraw"
                                rules={[
                                    {required: true, message: "Выберите тип транзакции"}
                                ]}
                            >
                                <Select className="with-select select-mobile" placeholder="Тип вывода">
                                    <Option value="1"> Стандартный </Option>
                                    <Option value="2"> Быстрый(10 % комиссия) </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="mobile-row">
                        <Col span={16}>
                            <div className="form-descrb">
                                Средства выводятся в ручном режиме.После отправления
                                заявки на вывод деньги поступят на ваш счет в течении 24
                                часов.
                            </div>
                        </Col>
                        <Col span={6} offset={1} className="withdraw-btn-class withdraw-mobile-btn-block">
                            <Form.Item className="withdraw-btn-class">
                                <button
                                    className="withdraw-btn layout-withdraw withdraw-mobile-btn"
                                    type="submit"
                                >
                                    <div className="form-btn-text">Вывести</div>
                                </button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Col>
    )
}

export default WithdrawForm