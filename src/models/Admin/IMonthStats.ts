interface perDayStats {
    id: number
    date: string
    sum: number
    profit: number
    count: number
    parent: number
}

export default interface IMonthStats {
    id: number
    name: string
    days: perDayStats[]
    date_from: string
    date_to: string
    sum: number
    expenses: number
    profit: number
    count: number
    trade_count: number
    accs_count: number
    garant_count: number
    fun_count: number
    other_count: number
    partners_count: number
    minimarket_count: number
}