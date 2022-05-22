export default interface IOrder {
    id: number
    name: string
    type: string
    type_content: string
    min_count_subs?: number | null
    max_count_subs?: number | null
    price_by_subs?: number | null
    bonus?: string | null
    owner?: number | null
    channel?: number | null
    price_by_channel?: number | null
    time_to_do?: number | null
    status: string
    price?: number | null
    is_request: boolean
    comment?: string | null
    price_mini: number
    url?: string | null
    type_mini: string
    moderation: string
    price_usd?: number | null
    design?: number | null
    time_expired?: string | null
    count?: number | null
    date: string
    email?: string | null
    is_mini: boolean
    type_transfer?: string | null
}