import IUser from "../models/Users/IUser";
import IOrder from "../models/Users/IOrder";
import IChannel from "../models/Users/IChannel";
import ITransaction from "../models/Users/ITransaction";
import IRating from "../models/Users/IRating";
import IWithdrawTemplates from "../models/Users/IWithdrawTemplates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialType {
    access: string | null
    refresh: string | null
    isAuthenticated: boolean
    isLoading: boolean
    user: IUser | null
    orders: IOrder[]
    user_orders: IOrder[]
    user_channels: IChannel[]
    user_transactions: ITransaction[]
    channel: IChannel | null
    channels: IChannel[]
    order: IOrder | null
    rating: IRating | null
    withdrawTemplates: IWithdrawTemplates | null
}


const initialState: initialType = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
    orders: [],
    user_orders: [],
    user_channels: [],
    user_transactions: [],
    channel: null,
    channels: [],
    order: null,
    rating: null,
    withdrawTemplates: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        accept_order: (state, action: PayloadAction<number>) => {
            const id = state.user_orders.findIndex(((obj) => obj.id === action.payload))
            state.user_orders[id] = {...state.user_orders[id], status: '2', type: '1'}
            state.user_channels = state.user_channels.filter((channel) => channel.id !== state.user_orders[id].channel?.id)
        },
        authenticated_success: (state) => {
            state.isAuthenticated = true
        },
        login_success: (state, action: PayloadAction<{refresh: string, access: string}>) => {
            localStorage.setItem('access', action.payload.access)
            state.isAuthenticated = true
            state.access = action.payload.access
            state.refresh = action.payload.refresh
        },
        load_user_success: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.user_orders = action.payload.orders
            state.user_channels = action.payload.channels
            state.user_transactions = action.payload.transactions
            state.isLoading = false
        },
        authentication_failed: (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.isAuthenticated = false
            state.access = null
            state.refresh = null
            state.user = null
            state.isLoading = false
        },
        get_orders: (state, action: PayloadAction<IOrder[]>) => {
            state.orders = action.payload
        },
        create_order: (state, action: PayloadAction<IOrder>) => {
            state.orders = state.orders.filter((order) => order.id !== action.payload.id)
            state.user_orders = [action.payload, ...state.user_orders]
        },
        confirm_order: (state, action: PayloadAction<number>) => {
            const confirm = state.user_orders.findIndex(((obj) => obj.id === action.payload))
            state.user_orders[confirm] = {...state.user_orders[confirm], status: '3'}
        },
        cancel_order: (state, action: PayloadAction<number>) => {
            const cancel = state.user_orders.findIndex(((obj) => obj.id === action.payload))
            if (state.user_orders[cancel].is_request) {
                state.user_orders[cancel] = {...state.user_orders[cancel], status: '5', type: '3'}
            } else {
                state.user_orders[cancel] = {...state.user_orders[cancel], status: '5'}
            }
        },
        get_channels: (state, action: PayloadAction<IChannel[]>) => {
            state.channels = action.payload
        },
        get_channel_data: (state, action: PayloadAction<IChannel>) => {
            state.channel = action.payload
        },
        create_channel: (state, action: PayloadAction<IChannel>) => {
            state.user_channels = [action.payload, ...state.user_channels]
        },
        get_order: (state, action: PayloadAction<IOrder>) => {
            state.order = action.payload
        },
        get_rating: (state, action: PayloadAction<IRating>) => {
            state.rating = action.payload
        },
        get_templates: (state, action: PayloadAction<IWithdrawTemplates>) => {
            state.withdrawTemplates = action.payload
        },
        create_transaction: (state, action: PayloadAction<ITransaction>) => {
            state.user_transactions = [action.payload, ...state.user_transactions]
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer