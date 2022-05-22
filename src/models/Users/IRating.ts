interface ITopUsers {
    col: number
    col_month: number
    name: string
    monthly: number
    sum_trades: number
}

interface ICurrentUser {
    col: number
    count_trades: number
    sum_trades: number
}


export default interface IRating {
    users: ITopUsers[]
    current: ICurrentUser
    month: ITopUsers[]
}
