import IChannel from "./IChannel";

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
    channel?: IChannel | null
    price_by_channel?: number | null
    time_to_do?: number | null
    status: string
    price?: number | null
    is_request: boolean
    comment?: string | null
    time_expired?: string
    channel_url? : string
    design?: {url: string}
    email?: string
}