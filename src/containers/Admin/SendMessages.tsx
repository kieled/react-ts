import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {layoutActions} from "../../reducers/layout";
import {sendMessages} from "../../actions/admin";
import {useAppDispatch} from "../../hooks";

const SendMessages = () => {
    const dispatch = useAppDispatch()

    const [btnLoad, setBtnLoad] = useState(false)

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления";
            dispatch(layoutActions.set_name("Рассылка сообщений Telegram"))
        }

        onLoad().then(null)
    }, [])

    const onFinish = async (e: any) => {
        setBtnLoad(true)
        await dispatch(sendMessages(e.message))
        setBtnLoad(false)
    }

    return (
        <>
            <Form className="admin-send-messages" onFinish={onFinish}>
                <Form.Item name="message" className="admin-form-input-send">
                    <Input.TextArea
                        className="admin-text-area"
                        placeholder="Введите сообщение"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={btnLoad}
                        className="green-btn-submit mb-2 mt-2"
                        type="primary"
                        htmlType="submit"
                    >
                        Отправить сообщение
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}


export default SendMessages
