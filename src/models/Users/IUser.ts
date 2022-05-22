import IChannel from "./IChannel";
import IOrder from "./IOrder";
import ITransaction from "./ITransaction";

export default interface IUser {
    id: number
    balance: number
    hold_balance: number
    name: string
    count_trades: number
    sum_trades: number
    count_channels: number
    is_admin: boolean
    is_minimarket: boolean
    tg_chat_id?: number | null
    is_active: boolean
    hold: boolean
    monthly?: number | null
    col?: number | null
    col_month?: number | null
    last_login: string
    username: string
    date_joined: string
    channels: IChannel[]
    orders: IOrder[]
    transactions: ITransaction[]
}