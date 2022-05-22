import IOrder from "../models/Admin/IOrder";
import IDesigns from "../models/Admin/IDesigns";
import IApp from "../models/Admin/IApp";
import IChannel from "../models/Admin/IChannel";
import IUser from "../models/Admin/IUser";
import IWithdraws from "../models/Admin/IWithdraws";
import IDesignCategories from "../models/Admin/IDesignCategories";
import IValues from "../models/Admin/IValues";
import IStatsDetail from "../models/Admin/IStatsDetail";
import IWorkers from "../models/Admin/IWorkers";
import ITemplates from "../models/Admin/ITemplates";
import IUserStats from "../models/Admin/IUserStats";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IActualDesigns from "../models/Admin/IActualDesigns";
import IMonthStats from "../models/Admin/IMonthStats";

interface adminState {
    orders: IOrder[]
    actualDesigns: IActualDesigns[]
    apps: IApp[]
    channels: IChannel[]
    our_channels: IChannel[]
    users: IUser[]
    withdraws: IWithdraws[]
    designs: IDesigns[]
    design_categories: IDesignCategories[]
    mini_orders: IOrder[]
    values: IValues[]
    stats: IMonthStats[]
    stats_detail: IStatsDetail | undefined
    workers: IWorkers[]
    templates: ITemplates
    user_stats: IUserStats | undefined
    usd_values: IValues[]
    count: number
}


const initialState: adminState = {
    orders: [],
    actualDesigns: [],
    apps: [],
    channels: [],
    our_channels: [],
    users: [],
    withdraws: [],
    designs: [],
    design_categories: [],
    mini_orders: [],
    values: [],
    stats: [],
    stats_detail: undefined,
    workers: [],
    templates: {
        id: 1,
        trade: '',
        accs: ''
    },
    user_stats: undefined,
    usd_values: [],
    count: 0
}


const editObject = (objects: any, data: any) => {
    return objects.map(
        (item: any) => item.id === data.id ? data : item
    )
}

const deleteObject = (objects: any, id: number) => {
    return objects.filter((item: any) => item.id !== id)
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        get_orders: (state, action: PayloadAction<IOrder[]>) => {
            state.orders = action.payload
        },
        delete_order: (state, action: PayloadAction<number>) => {
            state.orders = deleteObject(state.orders, action.payload)
        },
        edit_order: (state, action: PayloadAction<IOrder>) => {
            state.orders = editObject(state.orders, action.payload)
        },
        create_order: (state, action: PayloadAction<IOrder>) => {
            state.orders = [action.payload, ...state.orders]
        },
        get_actual_designs: (state, action: PayloadAction<IActualDesigns[]>) => {
            state.actualDesigns = action.payload
        },
        get_apps: (state, action: PayloadAction<IApp[]>) => {
            state.apps = action.payload
        },
        edit_app: (state, action: PayloadAction<IApp>) => {
            state.apps = editObject(state.apps, action.payload)
        },
        get_channels: (state, action: PayloadAction<IChannel[]>) => {
            state.channels = action.payload
        },
        edit_channel: (state, action: PayloadAction<IChannel>) => {
            state.channels = editObject(state.channels, action.payload)
        },
        buy_channel: (state, action: PayloadAction<number>) => {
            state.channels = state.channels.map(
                (content) => content.id === action.payload
                    ? { ...content, is_requested: true} : content
            )
        },
        delete_channel: (state, action: PayloadAction<number>) => {
            state.channels = deleteObject(state.channels, action.payload)
        },
        get_products: (state, action: PayloadAction<IChannel[]>) => {
            state.our_channels = action.payload
        },
        edit_product: (state, action: PayloadAction<IChannel>) => {
            state.our_channels = editObject(state.our_channels, action.payload)
        },
        create_product: (state, action: PayloadAction<IChannel>) => {
            state.our_channels = [action.payload, ...state.our_channels]
        },
        get_users: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        },
        edit_user: (state, action: PayloadAction<IUser>) => {
            state.users = editObject(state.users, action.payload)
        },
        delete_user: (state, action: PayloadAction<number>) => {
            state.users = deleteObject(state.users, action.payload)
        },
        create_user: (state, action: PayloadAction<IUser>) => {
            state.users = [action.payload, ...state.users]
        },
        get_withdraws: (state, action: PayloadAction<IWithdraws[]>) => {
            state.withdraws = action.payload
        },
        edit_withdraw: (state, action: PayloadAction<IWithdraws>) => {
            state.withdraws = editObject(state.withdraws, action.payload)
        },
        get_designs: (state, action: PayloadAction<IDesigns[]>) => {
            state.designs = action.payload
        },
        edit_designs: (state, action: PayloadAction<IDesigns>) => {
            state.designs = editObject(state.designs, action.payload)
        },
        create_design: (state, action: PayloadAction<IDesigns>) => {
            state.designs = [action.payload, ...state.designs]
        },
        get_design_categories: (state, action: PayloadAction<IDesignCategories[]>) => {
            state.design_categories = action.payload
        },
        edit_design_categories: (state, action: PayloadAction<IDesignCategories>) => {
            state.design_categories = editObject(state.design_categories, action.payload)
        },
        delele_design_categories: (state, action: PayloadAction<number>) => {
            state.design_categories = deleteObject(state.design_categories, action.payload)
        },
        create_design_categories: (state, action: PayloadAction<IDesignCategories>) => {
            state.design_categories = [action.payload, ...state.design_categories]
        },
        get_mini: (state, action: PayloadAction<IOrder[]>) => {
            state.mini_orders = action.payload
        },
        edit_mini: (state, action: PayloadAction<IOrder>) => {
            state.mini_orders = editObject(state.mini_orders, action.payload)
        },
        create_mini: (state, action: PayloadAction<IOrder>) => {
            state.mini_orders = [action.payload, ...state.mini_orders]
        },
        get_values: (state, action: PayloadAction<IValues[]>) => {
            state.values = action.payload
        },
        get_stats: (state, action: PayloadAction<IMonthStats[]>) => {
            state.stats = action.payload
        },
        get_period: (state, action: PayloadAction<IStatsDetail>) => {
            state.stats_detail = action.payload
        },
        get_workers: (state, action: PayloadAction<IWorkers[]>) => {
            state.workers = action.payload
        },
        get_templates: (state, action: PayloadAction<ITemplates>) => {
            state.templates = action.payload
        },
        get_users_stats: (state, action: PayloadAction<IUserStats>) => {
            state.user_stats = action.payload
        },
        get_usd_values: (state, action: PayloadAction<IValues[]>) => {
            state.usd_values = action.payload
        },
        set_count: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        }
    }
})

export const adminActions = adminSlice.actions

export default adminSlice.reducer