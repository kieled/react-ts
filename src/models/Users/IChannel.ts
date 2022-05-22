export default interface IChannel {
    id: number
    name: string
    subs: number
    url: string
    statusgroup?: string
    status?: string
}