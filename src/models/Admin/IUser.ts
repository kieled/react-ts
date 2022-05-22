export default interface IUser {
    id: number
    balance: number
    hold_balance: number
    name: string
    username: string
    password_visible?: string | null
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
    date_joined?: string
}