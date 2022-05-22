interface IDesignApp {
    id: number
    url: string
    category: string
}


export default interface IApp {
    bonus: string
    channel: string
    comment?: string | null
    count: number
    date: string
    design?: IDesignApp | null
    email: string
    id: number
    is_mini: boolean
    is_request: boolean
    max_count_subs?: number | null
    min_count_subs?: number | null
    moderation: string
    name: string
    owner: number
    price?: number | null
    price_by_channel?: number | null
    price_by_subs?: string | null
    price_mini?: number | null
    price_usd?: number | null
    status: string
    time_expired?: string | null
    time_to_do?: number | null
    type: string
    type_content: string
    type_mini?: string | null
    type_transfer?: string | null
    url?: string | null
}