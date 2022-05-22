import React, {useEffect, useState} from "react";
import {Form, Input, Select, Col, Row, Divider, Button, Modal} from "antd";
import {withdraw, load_user, updateWithdrawTemplates, getWithdrawTemplates} from "../../actions/auth";
import {toast} from "react-toastify";
import "../../css/balance.css";
import {ReactComponent as Info} from "../../svg/info.svg";
import ITransaction from "../../models/Users/ITransaction";
import {useAppDispatch, useAppSelector} from "../../hooks";

const {Option} = Select;

const MyBalance = () => {
    const {user_transactions, user, withdrawTemplates} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [balance, setBalance] = useState(0)
    const [hold, setHold] = useState(0)
    const [min, setMin] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [form] = Form.useForm()


    useEffect(() => {
        async function onLoad() {
            document.title = "Операции с балансом"
            await dispatch(getWithdrawTemplates())
            setBalance(user?.balance || 0)
            setHold(user?.hold_balance || 0)
        }

        onLoad().then(null)
    }, [])

    const onUpdateTemplate = async (e: any) => {
        e.id = withdrawTemplates?.id
        await dispatch(updateWithdrawTemplates(e))
        setIsModalVisible(false)
    }

    const onFinish = async (e: any) => {
        if (parseInt(e.sum) < min) {
            toast.error(
                "Минимальная сумма вывода для вашего банка " + min + " р.",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                }
            );
            return;
        }
        if (e.speed_withdraw === "2") {
            if (balance + hold >= parseInt(e.sum)) {
                setBalance(balance + hold - parseInt(e.sum))
                setHold(0)
                await dispatch(withdraw(e))
                dispatch(load_user())
                form.resetFields();
            } else {
                toast.error("Недостаточно средств", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        } else {
            if (balance >= parseInt(e.sum)) {
                setBalance(balance - parseInt(e.sum))
                await dispatch(withdraw(e))
                dispatch(load_user())
                form.resetFields();
            } else {
                toast.error("Недостаточно средств", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        }
    }

    const filter = (e: number) => {
        if (e === 6) {
            return 800;
        } else if (e === 5) {
            return 800;
        } else if (e === 7) {
            return 300;
        } else if (e === 8) {
            return 300;
        } else if (e === 1) {
            return 100;
        } else if (e === 2) {
            return 200;
        } else {
            return 0;
        }
    }

    const onMin = (e: number) => {
        setMin(filter(e))
        let a: number
        if (e === 8) {
            a = 4
        } else {
            a = e - 1
        }
        let dicttt = [
            'qiwi',
            'umoney',
            'sber',
            'by_card',
            'tinkoff',
        ]
        const key = dicttt[a]
        if (withdrawTemplates?[key] : false) {
            form.setFieldsValue({'credentials': withdrawTemplates?[key] : null})
        }
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const getStatusBlock = (id: number, desrb: string | null | undefined = "") => {
        if (id === 1) {
            return <div className="status-block status-success"> Выполнено </div>;
        } else if (id === 2) {
            return <div className="status-block status-process"> В процессе </div>;
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
            );
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3 mobile-wallets">
                <h1 className="text-balance mb-3"> Мои кошельки </h1>
                <Button onClick={() => setIsModalVisible(true)}
                        className="green-btn-submit">Редактировать</Button>
            </div>
            <h1 className="text-balance mb-3"> Операции с балансом </h1>
            <Row className="main-balance-block">
                <Col span={7} className="mobile-balance">
                    <div className="balance-main mb15">
                        <div className="balance-descrp"> Основной баланс</div>
                        <div className="balance-count">

                            {balance}
                            <span className="weighnorlal-white"> ₽ </span>
                        </div>
                    </div>
                    <div className="balance-hold">
                        <div className="balance-hold-dscr"> На удержании</div>
                        <div className="hold-count">

                            {hold}
                            <span className="weighnorlal-black"> ₽ </span>
                        </div>
                    </div>
                </Col>
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
                                        rules={[
                                            {
                                                required: true,
                                                message: "Выберите платежную систему",
                                            },
                                        ]}
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
                                            {required: true, message: "Выберите тип транзакции"},
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
            </Row>
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

                            {item.type_withdraw === null
                                ? "Система"
                                : item.type_withdraw}
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
                );
            })}
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
        </>
    );
}


export default MyBalance
