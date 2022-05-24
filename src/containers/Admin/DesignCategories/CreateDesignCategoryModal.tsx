import React, {FC} from 'react';
import {Button, Col, Form, Input, Modal, Row} from "antd";

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
}

const CreateDesignCategoryModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish}) => {
    return (
        <Modal width={751} centered className="admin-modal" title="Создание катеригории"
               visible={isModalVisible} footer={null}
               onCancel={() => setIsModalVisible(false)}>
            <Form name="create-design" onFinish={onFinish}>
                <Row>
                    <Col span={24}>
                        <div className="admin-label"> Имя категории</div>
                        <Form.Item name="name" className="admin-input">
                            <Input placeholder="Введите имя"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="green-btn-submit" type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateDesignCategoryModal;