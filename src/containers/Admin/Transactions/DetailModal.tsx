import React, {FC} from 'react'
import {Col, Modal, Row} from "antd"
import IWorkers from "../../../models/Admin/IWorkers"
import IWithdraws from "../../../models/Admin/IWithdraws";

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    withdraw: IWithdraws
    workers: IWorkers[]
}

const DetailModal: FC<Props> = ({
                                    isModalVisible,
                                    setIsModalVisible,
                                    withdraw,
                                    workers
                                }) => {
    const getStatus = (status: string) => {
        if (status === '1') {
            return "Оплачено"
        } else if (status === '2') {
            return "Ожидает"
        } else if (status === '3') {
            return "Отклонено"
        }
    }

    return (
        <Modal
            centered
            width={751}
            className="admin-modal"
            title="Статус заявки на вывод"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}>
            <div className="mb-5">
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Номер</div>
                        <div className="admin-psevdo-input first-column-table admin-copiable">
                            {withdraw.id}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Сотрудник</div>
                        <div className="admin-psevdo-input admin-copiable">
                            {workers.find((worker: IWorkers) =>
                                worker.id === withdraw.author)?.name}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label"> Тип операции</div>
                        <div className="admin-psevdo-input first-column-table admin-copiable">
                            {withdraw.type === "1" ? "Пополнение" : "Вывод"}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label"> Сумма</div>
                        <div className="admin-psevdo-input admin-copiable">
                            {withdraw.sum}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Платежная система</div>
                        <div className="admin-psevdo-input admin-copiable">
                            {withdraw?.type_withdraw}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Реквизиты</div>
                        <div className="admin-psevdo-input admin-copiable">
                            {withdraw?.credentials}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="admin-label">Заказ</div>
                        <div className="admin-psevdo-input first-column-table admin-copiable">
                            {withdraw.order ? withdraw.order : "-"}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="admin-label">Статус</div>
                        <div className="admin-psevdo-input admin-copiable">
                            {getStatus(withdraw?.status)}
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default DetailModal