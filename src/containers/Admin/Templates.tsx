import React, {useEffect, useState} from "react";
import {layoutActions} from "../../reducers/layout";
import {getTemplates, editTemplates} from "../../actions/admin";
import {Button, Form, Input, Modal, Row} from "antd";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../hooks";


const Templates = () => {
    const {templates} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        async function onLoad() {
            await dispatch(getTemplates())
            document.title = "Панель управления"
            dispatch(layoutActions.set_name("Шаблоны"))
        }

        onLoad().then(null)
    }, [])

    const onCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
        toast.success("Текст успешно скопирован", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }

    const onFinish = async (e: any) => {
        await dispatch(editTemplates(e))
        setIsModalVisible(false)
    }

    return (
        <>
            <button className="admin-mini-btn-editor-prices" onClick={() => setIsModalVisible(true)}>
                Редактировать
            </button>
            <Row className="mb-5">
                <button onClick={() => onCopy(templates.trade)} className="template-text">
                    Копировать TRADE
                </button>
            </Row>
            <Row>
                <button onClick={() => onCopy(templates.accs)} className="template-text">
                    Копировать ACCS
                </button>
            </Row>
            <Modal
                centered
                width={751}
                className="admin-modal"
                title="Редактирование шаблонов"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}>
                <Form name="edit-template" onFinish={onFinish} initialValues={templates}>
                    <div className="admin-label">Trade-Groups</div>
                    <Form.Item name="trade" className="comment">
                        <Input.TextArea placeholder="Trade-Groups"/>
                    </Form.Item>
                    <div className="admin-label">Accs-Market</div>
                    <Form.Item name="accs" className="comment">
                        <Input.TextArea placeholder="Accs-Market"/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="green-btn-submit mb-2 mt-2" type="primary" htmlType="submit">
                            Редактировать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Templates
