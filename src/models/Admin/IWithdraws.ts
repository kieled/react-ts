export default interface IWithdraws {
    id: number
    sum: number
    date: string
    date_expired?: string | null
    type_withdraw?: string | null
    speed_withdraw: string
    credentials? : string | null
    order?: string | null
    credentials_name?: string | null
    type: string
    author: number
    status: string
    comment?: string | null
}