import React, {useEffect, useState} from "react"
import {Input, Form} from "antd"
import {
    getUsers,
    editUser,
    deleteUser,
    createUser,
} from "../../../actions/admin"
import {layoutActions} from "../../../reducers/layout"
import IUser from "../../../models/Admin/IUser"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import UsersList from "./UsersList"
import EditUserModal from "./EditUserModal"
import NewUserModal from "./NewUserModal"


const {Search} = Input

const Users = () => {
    const {users, count} = useAppSelector(state => state.adminSlice)
    const dispatch = useAppDispatch()

    const [id, setId] = useState<number | null>(null)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [uid, setUid] = useState<number>(0)
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
        e.id = id
        await dispatch(editUser(e))
        setIsModalVisible(false)
    }

    const onChange = async (e: any) => {
        let data = {
            id: id,
            hold: e,
            is_active: e !== true
        }
        await dispatch(editUser(data))
    }

    const onDelete = async () => {
        setIsEditModalVisible(false)
        await dispatch(deleteUser(id || 0))
    }

    const onFilter = (e: string) => {
        setFilterName(e)
    }



    const onEditModal = async (id: number) => {
        const uid = users.findIndex((obj: IUser) => obj.id === id)
        setId(id)
        setUid(uid)
        setIsEditModalVisible(true)
        form.resetFields()
    }


        return (
            <div>
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
                <UsersList onEditModal={onEditModal} 
                           setCurrent={setCurrent} 
                           isLoading={isLoading} 
                           users={users} 
                           current={current} 
                           count={count} 
                />
                
                <EditUserModal isEditModalVisible={isEditModalVisible} 
                               setIsEditModalVisible={setIsEditModalVisible} 
                               form={form} 
                               onEdit={onEdit} 
                               user={users[uid]} 
                               onChange={onChange} 
                               onDelete={onDelete} 
                />
                
                <NewUserModal isModalVisible={isModalVisible} 
                              setIsModalVisible={setIsModalVisible} 
                              onFinish={onFinish} 
                />
                
            </div>
        )
}

export default Users
