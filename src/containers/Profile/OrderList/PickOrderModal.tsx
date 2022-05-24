import React, {FC} from 'react'
import {Button, Form, FormInstance, Modal, Select} from "antd"
import IChannel from "../../../models/Users/IChannel"


type Props = {
    openModal: boolean
    closeModal: () => void
    form: FormInstance
    onFinish: (values: any) => void
    onChange: (e: number) => void
    channels: IChannel[]
}


const PickOrderModal: FC<Props> = ({
                            openModal,
                            closeModal,
                            form,
                            onFinish,
                            onChange,
                            channels
                        }) => {
    return (
        <Modal
            centered
            title="Взятие заказа"
            visible={openModal}
            footer={null}
            onCancel={() => closeModal()}
        >
            <Form form={form} onFinish={onFinish}>
                <p className="modal-text-body">
                    Перед началом выполнения заказа выберите подходящий канал из
                    списка ваших каналов.
                </p>
                <Form.Item name="channel" rules={[{required: true}]}>
                    <Select placeholder="Выберите канал" onChange={onChange}>
                        {channels.map((channel: IChannel) => {
                            return (
                                <Select.Option key={channel.id} value={channel.id}>
                                    {channel.name} - {channel.subs} п.
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="green-btn">
                        Начать выполнение
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PickOrderModal