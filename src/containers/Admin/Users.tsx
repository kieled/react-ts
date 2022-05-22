import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Input, Form, Col, Row, Switch, TablePaginationConfig} from "antd";
import {
    getUsers,
    editUser,
    deleteUser,
    createUser,
} from "../../actions/admin";
import {layoutActions} from "../../reducers/layout";
import {EditOutlined} from "@ant-design/icons";
import IUser from "../../models/Admin/IUser";
import {useAppDispatch, useAppSelector} from "../../hooks";


const {Search} = Input;

const Users = () => {
    const {users, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [id, setId] = useState<number | null>(null)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterName, setFilterName] = useState('')
    const [current, setCurrent] = useState(1)

    const [form] = Form.useForm()

    useEffect(() => {
        async function onLoad() {
            document.title = "Панель управления"
            dispatch(layoutActions.set_name("Сотрудники"))
            setIsLoading(true)
            await dispatch(getUsers(filterName, current))
            setIsLoading(false)
        }

        onLoad().then(null)
    }, [ filterName, current ])

    const onFinish = async (e: any) => {
        await dispatch(createUser(e))
        setIsModalVisible(false)
    }

    const onEdit = async (e: any) => {
        e.id = id;
        await dispatch(editUser(e))
        setIsModalVisible(false)
    }

    const onChange = async (e: any) => {
        let data = {
            id: id,
            hold: e,
            is_active: e !== true
        };
        await dispatch(editUser(data))
    }

    const onDelete = async () => {
        setIsEditModalVisible(false)
        await dispatch(deleteUser(id || 0))
    }

    const onFilter = (e: string) => {
        setFilterName(e)
    }

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const onEditModal = async (id: number) => {
        const uid = users.findIndex((obj: IUser) => obj.id === id);
        setId(id)
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields();
    }

        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
            },
            {
                title: "Имя",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Дата регистрации",
                dataIndex: "date_joined",
                key: "date_joined",
            },
            {
                title: "Последняя активность",
                dataIndex: "last_login",
                key: "last_login",
            },
            {
                title: "",
                dataIndex: "id",
                key: "x",
                render: (id: number) => (
                    <>
                        <Button
                            className="admin-action-btn"
                            icon={<EditOutlined/>}
                            onClick={() => onEditModal(id)}
                        />
                    </>
                )
            },
        ];
        return (
            <div className="admin-action-buttons">
                <div className="d-flex mb-4">
                    <button className="admin-new-user-btn"
                        onClick={() => setIsModalVisible(true)}>
                        <span> Новый сотрудник </span>
                    </button>
                    <Search
                        className="admin-channels-search m0"
                        placeholder="Введите имя пользователя"
                        onSearch={onFilter}/>
                </div>
                <Modal
                    className="admin-modal"
                    centered
                    width={751}
                    title="Новый сотрудник"
                    visible={isModalVisible}
                    footer={null}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form name="create-user" onFinish={onFinish}>
                        <Row>
                            <Col span={24}>
                                <div className="admin-label">Имя и фамилия</div>
                                <Form.Item
                                    name="name"
                                    className="admin-input"
                                    rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="admin-label">Логин</div>
                                <Form.Item
                                    name="username"
                                    className="admin-input first-column-table"
                                    rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div className="admin-label"> Пароль</div>
                                <Form.Item
                                    name="password_visible"
                                    className="admin-input"
                                    rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="admin-label"> Чисто продаж(необязательно)</div>
                                <Form.Item name="count_trades first-column-table"
                                    className="admin-input">
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button className="green-btn-submit mt-3 mb-2"
                                type="primary" htmlType="submit"
                            >Добавить сотрудника</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    className="admin-modal"
                    centered
                    width={751}
                    title="Редактирование пользователя"
                    visible={isEditModalVisible}
                    footer={null}
                    onCancel={() => setIsEditModalVisible(false)}
                >
                    <Form
                        form={form}
                        name="edit-order"
                        onFinish={onEdit}
                        initialValues={users !== null ? users[uid || 0] : undefined}>

                        {users !== null && uid !== null ? (
                            <>
                                {users[uid] ? (
                                    <>
                                        <Row>
                                            <Col span={24}>
                                                <div className="admin-label"> Имя и фамилия</div>
                                                <Form.Item
                                                    className="admin-input"
                                                    name="name"
                                                    rules={[{required: true}]}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <div className="admin-label"> Логин</div>
                                                <div className="admin-psevdo-input">
                                                    {users[uid].username}
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="admin-label"> Пароль</div>
                                                <Form.Item
                                                    name="password_visible"
                                                    className="admin-input"
                                                    rules={[{required: true}]}>
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <div className="admin-label">Дата добавления в базу</div>
                                                <div className="admin-psevdo-input">
                                                    {users[uid].date_joined}
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="admin-label"> Чисто продаж</div>
                                                <Form.Item className="admin-input" name="count_trades">
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <div className="admin-label"> Сумма продаж</div>
                                                <Form.Item
                                                    className="admin-input first-column-table"
                                                    name="sum_trades">
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <div className="admin-label"> Текущий баланс</div>
                                                <Form.Item className="admin-input" name="balance">
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <div className="admin-label"> Замороженный баланс</div>
                                                <Form.Item
                                                    className="admin-input first-column-table"
                                                    name="hold_balance">
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <div className="admin-label">
                                                    Является ли аккаунт замороженным
                                                </div>
                                                <Form.Item className="admin-input" name="hold">
                                                    <Switch
                                                        onChange={onChange}
                                                        checked={users[uid].hold}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item>
                                            <Button
                                                className="green-btn-submit mt-2"
                                                type="primary"
                                                htmlType="submit">
                                                Сохранить
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <div
                                                className="admin-delete-user-btn"
                                                onClick={onDelete}>
                                                <span>Удалить профиль</span>
                                            </div>
                                        </Form.Item>
                                    </>) : ''}
                            </>) : ''}
                    </Form>
                </Modal>
                <Table
                    sticky={true}
                    columns={columns}
                    rowKey={item => item.id}
                    loading={isLoading}
                    onChange={onPaginate}
                    dataSource={users}
                    pagination={{current: current, pageSize: 10, total: count}}
                />
            </div>
        );
}

export default Users
