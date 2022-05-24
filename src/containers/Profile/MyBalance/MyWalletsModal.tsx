import React, {FC} from 'react'
import {ReactComponent as Info} from "../../../svg/info.svg"
import {Button, Form, Input, Modal} from "antd"
import IWithdrawTemplates from "../../../models/Users/IWithdrawTemplates"

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onUpdateTemplate: (value: any) => void
    withdrawTemplates: IWithdrawTemplates | null
}


const MyWalletsModal: FC<Props> = ({
                            isModalVisible,
                            setIsModalVisible,
                            onUpdateTemplate,
                            withdrawTemplates
                        }) => {
    return (
        <Modal
            centered
            width={605}
            className="admin-modal"
            title="Мои кошельки"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
        >
            <div className="d-flex align-center text">
                <div>
                    <Info className="text-icon"/>
                </div>
                <div className="text_underline">
                    В реквизиты “Банковских карт” ввододить только номер.
                </div>
            </div>
            <Form name="templates" onFinish={onUpdateTemplate} initialValues={withdrawTemplates || undefined}>
                <Form.Item className="admin-input" name="qiwi">
                    <Input placeholder="Qiwi"/>
                </Form.Item>
                <Form.Item className="admin-input" name="umoney">
                    <Input placeholder="Юmoney"/>
                </Form.Item>
                <Form.Item className="admin-input" name="sber">
                    <Input placeholder="Cбербанк"/>
                </Form.Item>
                <Form.Item className="admin-input" name="tinkoff">
                    <Input placeholder="Тинькофф"/>
                </Form.Item>
                <Form.Item className="admin-input" name="by_card">
                    <Input placeholder="Карта банка РБ"/>
                </Form.Item>
                <div className="d-flex justify-content-center mb-3">
                    <Button htmlType="submit" className="green-btn-submit">Сохранить</Button>
                </div>
            </Form>
        </Modal>
    )
}

export default MyWalletsModal