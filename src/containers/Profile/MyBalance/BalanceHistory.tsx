import React, {FC} from 'react'
import {Col, Divider, Row} from "antd"
import ITransaction from "../../../models/Users/ITransaction"

type Props = {
    user_transactions: ITransaction[]
}


const BalanceHistory: FC<Props> = ({
                            user_transactions
                        }) => {

    const getStatusBlock = (id: number, desrb: string | null | undefined = "") => {
        if (id === 1) {
            return <div className="status-block status-success"> Выполнено </div>
        } else if (id === 2) {
            return <div className="status-block status-process"> В процессе </div>
        } else if (id === 3) {
            return (
                <div>
                    <Row style={{justifyContent: "end"}}>
                        <div className="status-block status-cancel"> Отклонено</div>
                    </Row>
                    <Row className="mt-2" style={{justifyContent: "end"}}>
                        <div className="error-transaction"> Причина:</div>
                        <div className="error-transaction"> {desrb} </div>
                    </Row>
                </div>
            )
        }
    }
    return (
        <>
            <h2 className="text-balance mb-3">История</h2>
            <Row className="table-rows justify-content-between">
                <Col span={2} className="mobile-hide"> Номер </Col>
                <Col span={4} className="mobile-hide"> Дата </Col>
                <Col span={4}> Тип </Col>
                <Col span={5} className="mobile-hide"> Плетежная система </Col>
                <Col span={5}> Сумма </Col>
                <Col span={4} className="d-flex justify-content-center">
                    Статус
                </Col>
            </Row>
            <Divider className="table-divider"/>
            {user_transactions.map((item: ITransaction) => {
                return (
                    <Row className="ant-table-cell justify-content-between" key={item.id}>
                        <Col span={2} className="mobile-hide"> #{item.id} </Col>
                        <Col span={4} className="mobile-hide"> {item.date} </Col>
                        <Col span={4}>

                            {item.type === "Пополнение" ? (
                                <div className="green"> Пополнение </div>
                            ) : (
                                item.type
                            )}
                        </Col>
                        <Col span={5} className="mobile-hide">

                            {!item.type_withdraw
                                ? "Система" : item.type_withdraw}
                        </Col>
                        <Col span={5}>
                            {item.type === "Пополнение" ? (
                                <div className="green"> {item.sum}₽ </div>
                            ) : (
                                <>{item.sum} ₽</>
                            )}
                        </Col>
                        <Col span={4} className="d-flex flex-row-reverse">
                            {getStatusBlock(parseInt(item.status), item.comment)}
                        </Col>
                        <Divider className="table-items"/>
                    </Row>
                )
            })}
        </>
    )
}

export default BalanceHistory