import React, {FC} from 'react';
import {Col, Modal, Row} from "antd";
import IMonthStats from "../../../models/Admin/IMonthStats";

type Props = {
    isModalVisible: boolean
    setIsModalVisible: (value: boolean) => void
    stat: IMonthStats | undefined
}

const ProductsStatusInfoModal: FC<Props> = ({
                                     isModalVisible,
                                     setIsModalVisible,
                                     stat
                                 }) => {
    return (
        <Modal
            centered
            className="admin-modal"
            width={751}
            title="Общая информация"
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Период</div>
                    <div className="admin-psevdo-input">
                        {stat?.name}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="admin-label"> Кол - во продаж</div>
                    <div className="admin-psevdo-input">
                        {stat?.count}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Сумма продаж</div>
                    <div className="admin-psevdo-input">
                        {stat?.sum}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="admin-label"> Расходы</div>
                    <div className="admin-psevdo-input">
                        {stat?.expenses}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Чистая прибыль</div>
                    <div className="admin-psevdo-input">
                        {stat?.profit}
                    </div>
                </Col>
            </Row>
            <h3 className="title mt-3"> Статистика продаж по площадкам </h3>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Accs Market</div>
                    <div className="admin-psevdo-input">
                        {stat?.accs_count}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="admin-label"> Trade Groups</div>
                    <div className="admin-psevdo-input">
                        {stat?.trade_count}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Garant Market</div>
                    <div className="admin-psevdo-input">
                        {stat?.garant_count}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="admin-label"> Fun Pay</div>
                    <div className="admin-psevdo-input">
                        {stat?.fun_count}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div className="admin-label"> Другие площадки</div>
                    <div className="admin-psevdo-input">
                        {stat?.other_count}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="admin-label"> Партнеры</div>
                    <div className="admin-psevdo-input">
                        {stat?.partners_count}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12} className="mb-5">
                    <div className="admin-label"> Mini Market</div>
                    <div className="admin-psevdo-input">
                        {stat?.minimarket_count}
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductsStatusInfoModal;