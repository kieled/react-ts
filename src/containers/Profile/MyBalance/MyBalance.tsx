import React, {useEffect, useState} from "react"
import {Form, Button, Row} from "antd"
import {withdraw, load_user, updateWithdrawTemplates, getWithdrawTemplates} from "../../../actions/auth"
import {toast} from "react-toastify"
import "../../../css/balance.css"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import {errorMessage} from "../../../actions/admin";
import MainBalanceBlocks from "./MainBalanceBlocks";
import WithdrawForm from "./WithdrawForm";
import BalanceHistory from "./BalanceHistory";
import MyWalletsModal from "./MyWalletsModal";


const MyBalance = () => {
    const ErrorMessage = (text: string) => {
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }
    const {user_transactions, user, withdrawTemplates} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    const [balance, setBalance] = useState(0)
    const [hold, setHold] = useState(0)
    const [min, setMin] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [form] = Form.useForm()


    useEffect(() => {
        async function onLoad() {
            document.title = "Операции с балансом"
            await dispatch(getWithdrawTemplates())
            setBalance(user?.balance || 0)
            setHold(user?.hold_balance || 0)
        }

        onLoad().then(() => setIsLoading(false))
    }, [])

    const onUpdateTemplate = async (e: any) => {
        e.id = withdrawTemplates?.id
        await dispatch(updateWithdrawTemplates(e))
        setIsModalVisible(false)
    }

    const onFinish = async (e: any) => {
        if (parseInt(e.sum) < min) {
            errorMessage("Минимальная сумма вывода для вашего банка " + min + " р.")
            return
        }
        const update = async () => {
            await dispatch(withdraw(e))
            dispatch(load_user())
            form.resetFields()
        }

        if (e.speed_withdraw === "2") {
            if (balance + hold >= parseInt(e.sum)) {
                setBalance(balance + hold - parseInt(e.sum))
                setHold(0)
                await update()
            } else ErrorMessage('Недостаточно средств')
        } else {
            if (balance >= parseInt(e.sum)) {
                setBalance(balance - parseInt(e.sum))
                await update()
            } else {
                ErrorMessage("Недостаточно средств")
            }
        }
    }

    const filter = (e: number) => {
        if (e === 6) {
            return 800
        } else if (e === 5) {
            return 800
        } else if (e === 7) {
            return 300
        } else if (e === 8) {
            return 300
        } else if (e === 1) {
            return 100
        } else if (e === 2) {
            return 200
        } else {
            return 0
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

    return (
        <>
            <div className="d-flex justify-content-between mb-3 mobile-wallets">
                <h1 className="text-balance mb-3"> Мои кошельки </h1>
                <Button onClick={() => setIsModalVisible(true)}
                        className="green-btn-submit">Редактировать</Button>
            </div>

            <h1 className="text-balance mb-3"> Операции с балансом </h1>
            <Row className="main-balance-block">

            <MainBalanceBlocks balance={balance} hold={hold} isLoading={isLoading} />

            <WithdrawForm form={form} onFinish={onFinish} onMin={onMin} />
            </Row>
            <BalanceHistory user_transactions={user_transactions} />

            <MyWalletsModal isModalVisible={isModalVisible}
                            setIsModalVisible={setIsModalVisible}
                            onUpdateTemplate={onUpdateTemplate}
                            withdrawTemplates={withdrawTemplates}
            />
        </>
    )
}


export default MyBalance
