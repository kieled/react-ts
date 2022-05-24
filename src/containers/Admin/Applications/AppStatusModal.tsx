import React, {FC} from 'react';
import {Button, Col, Form, FormInstance, Input, Modal, Row, Select} from "antd";
import IWorkers from "../../../models/Admin/IWorkers";
import IApp from "../../../models/Admin/IApp";


const {Option} = Select


type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    onFinish: (values: any) => void
    app: IApp
    form: FormInstance
    workers: IWorkers[]
}

const AppStatusModal: FC<Props> = ({isModalVisible, setIsModalVisible, onFinish, app, form, workers}) => {
    return (
        <Modal centered width={751} title='Статус заявки'
               visible={isModalVisible} footer={null}
               onCancel={() => setIsModalVisible(false)}>
            <Form form={form} name='edit-order'
                  onFinish={onFinish} initialValues={app? app : undefined}> {
                app ?
                    <>
                        <Row>
                            <Col span={12}>
                                <div className='admin-label'>Канал</div>
                                <div className='admin-psevdo-input'>
                                    <a target='_blank' rel='noreferrer'
                                       href={app?.channel}>
                                        Перейти</a>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='admin-label'>Дата</div>
                                <div className='admin-psevdo-input'> {app?.date}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className='admin-label'> Тип заказа</div>
                                <div className='admin-psevdo-input'> {
                                    app?.name === 'None+' ? 'прямая покупка'
                                        : app?.name}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='admin-label'>К оплате</div>
                                <div className='admin-psevdo-input'>
                                    {app?.price_by_channel}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className='admin-label'> Почта для передачи прав владельца</div>
                                <div className='admin-psevdo-input'> {app?.email} </div>
                            </Col>
                            <Col span={12}>
                                <div className='admin-label'> Сотрудник</div>
                                <div className='admin-psevdo-input'> {
                                    workers?.find((worker: IWorkers) =>
                                        worker.id === app?.owner)?.name
                                } | ID : {app?.owner}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className='admin-label'>Дизайн</div>
                                <div className='admin-psevdo-input'>
                                    {app?.design !== null ?
                                        <a href={app?.design?.url}>
                                            {app?.design?.category}
                                            {app?.design?.id}
                                        </a> : 'Отключён'}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='admin-label'> Статус заявки</div>
                                <div>
                                    <Form.Item name='status'
                                               rules={[{required: true, message: 'Выберите статус'}]}>
                                        <Select className='admin-select select-place-black'
                                                placeholder='Выберите тип контента'>
                                            <Option value='2'> В работе </Option>
                                            <Option value='3'> На модерации </Option>
                                            <Option value='4'> Выполнена </Option>
                                            <Option value='5'> Отклонена </Option>
                                            <Option value='6'> Просрочена </Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row> </> : ''}
                <Row>
                    <Col span={24}>
                        <div className='admin-label'>Комментарий(необязательно)</div>
                        <Form.Item name='comment'>
                            <Input.TextArea rows={4} className='admin-text-area'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className='green-btn-submit' type='primary' htmlType='submit'>
                        Обновить статус
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AppStatusModal;