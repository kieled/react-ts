import axios from "axios";
import {
    toast
} from 'react-toastify';
import IChannel from "../models/Admin/IChannel";
import IOrder from "../models/Admin/IOrder";
import IDesigns from "../models/Admin/IDesigns";
import {adminActions} from "../reducers/admin";
import {AppDispatch} from "../store";
import IApp from "../models/Admin/IApp";
import IUser from "../models/Admin/IUser";
import IWithdraws from "../models/Admin/IWithdraws";
import IDesignCategories from "../models/Admin/IDesignCategories";
import IValues from "../models/Admin/IValues";
import IStatsDetail from "../models/Admin/IStatsDetail";
import IWorkers from "../models/Admin/IWorkers";
import ITemplates from "../models/Admin/ITemplates";
import IUserStats from "../models/Admin/IUserStats";
import IActualDesigns from "../models/Admin/IActualDesigns";
import IMonthStats from "../models/Admin/IMonthStats";

const back_url = process.env.REACT_APP_API_URL

export const errorMessage = (e: string) => {
    toast.error(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    })
};

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

export const successMessage = (e: string) => {
    toast.success(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    })
};

export const conf = (token?: string | null) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
            'Accept': 'application/json'
        }
    }
}

export const getOrders = (worker = '', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios
            .get<{ results: IOrder[], count: number }>(
                `${back_url}a/b-orders/?worker${worker}&page=${page}`, config
            );
        await dispatch(adminActions.get_orders(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка заказов');
    }
};

export const deleteOrders = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        await axios
            .delete(`${back_url}a/orders/${id}/`, config);
        await dispatch(adminActions.delete_order(id))
        successMessage('Заказ успешно удалена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка удаления заказа');
    }
};

export const getActualDesigns = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios
            .get<{ results: IActualDesigns[] }>(
                `${back_url}a/designs/?status=1`, config
            );
        await dispatch(adminActions.get_actual_designs(data.results))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка дизайнов');
    }
};

export const createOrder = (data: IOrder) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(data);
    try {
        const res = await axios
            .post<IOrder>(
                `${back_url}a/orders/`, body, config
            )
        await dispatch(adminActions.create_order(res.data));
        successMessage('Заказ успешно создан');
    } catch (e) {
        errorMessage('Ошибка создания заказа')
    }
};

export const editOrder = (order: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(order);

    try {
        const {data} = await axios
            .put<IOrder>(`${back_url}a/edit-order/${order.id}/`, body, config);
        await dispatch(adminActions.edit_order(data));
        successMessage('Заказ отредактирован');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования заказа');
    }
};

export const deleteChannel = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        await axios
            .delete(`${back_url}a/channel/delete/${id}/`, config);
        await dispatch(adminActions.delete_channel(id));
        successMessage('Канал успешно удалён');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка удаления канала');
    }
};

export const editApp = (app: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(app);

    try {
        const {data} = await axios
            .put<IApp>(
                `${back_url}a/edit-order/${app.id}/`, body, config
            )
        await dispatch(adminActions.edit_app(data))
        successMessage('Заявка успешно отредактирована')

    } catch (e) {
        console.log(e)
        errorMessage('Ошибка редактирования заявки')
    }
};

export const getApps = (owner = '', status = '', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios
            .get<{ results: IApp[], count: number }>(
                `${back_url}a/m-orders/?owner=${owner}&status=${status}&page=${page}`, config
            )
        await dispatch(adminActions.get_apps(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка заявок');
    }
};

export const getChannels = (worker = '', search = '', status='', minsubs= '', maxsubs= '', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios
            .get<{ results: IChannel[], count: number }>(
                `${back_url}a/uchannels/?worker=${worker}&search=${search}&status=${status}&minsubs=${minsubs}&maxsubs=${maxsubs}&page=${page}`, config
            );
        await dispatch(adminActions.get_channels(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка каналов');
    }
};

export const editChannel = (channel: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(channel);

    try {
        const {data} = await axios.put<IChannel>(
            `${back_url}a/channel/${channel.id}/`, body, config
        );
        await dispatch(adminActions.edit_channel(data));
        successMessage('Информация о канале успешно обновлена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования');
    }
};

export const buyChannel = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(id);

    try {
        await axios
            .post<IChannel>(
                `${back_url}a/channel/buy/${id}/`, body, config
            );
        await dispatch(adminActions.buy_channel(id));
        successMessage('Заявка на покупку канала успешно отправлена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка создания заявки на покупку');
    }
};

export const getOurChannels = (id = '', status='', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios
            .get<{ results: IChannel[], count: number }>(
                `${back_url}a/channels/?search=${id}&status=${status}&page=${page}`, config
            );
        await dispatch(adminActions.get_products(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка товаров');
    }
};

export const createChannel = (channel: IChannel) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(channel);

    try {
        const {data} = await axios
            .post<IChannel>(`${back_url}a/channel/create/`, body, config);
        await dispatch(adminActions.create_product(data));
        successMessage('Канал успешно создан');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка создания канала');
    }
};

export const editProduct = (channel: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(channel);

    try {
        const {data} = await axios
            .put<IChannel>(`${back_url}a/channel/${channel.id}/`, body, config);
        await dispatch(adminActions.edit_product(data))
        successMessage('Информация о товаре успешно обновлена')
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования товара');
    }
};

export const createUser = (user: IUser) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(user);

    try {
        const {data} = await axios.post<IUser>(`${back_url}a/user/create/`, body, config);
        dispatch(adminActions.create_user(data));
        successMessage('Пользователь успешно создан');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка создания пользователя');
    }
};

export const editUser = (user: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(user);

    try {
        const {data} = await axios.put<IUser>(`${back_url}a/user/update/${user.id}/`, body, config);
        dispatch(adminActions.edit_user(data));
        successMessage('Информация о пользователе успешно обновлена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования данных пользователя');
    }
};

export const getUsers = (search = '', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IUser[], count: number }>(`${back_url}a/users/?search=${search}&page=${page}`, config);
        await dispatch(adminActions.get_users(data.results));
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка пользователей');
    }
};

export const deleteUser = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        await axios.delete(`${back_url}a/user/delete/${id}/`, config);
        dispatch(adminActions.delete_user(id));
        successMessage('Пользователь успешно удалён');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка удаления пользователя');
    }
};

export const getWithdraws = (author = '', type = '', date = '', status='', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IWithdraws[], count: number }>(`${back_url}a/transactions/?author=${author}&type=${type}&date_after=${date}&date_before=${date}&page=${page}&status=${status}`, config);
        await dispatch(adminActions.get_withdraws(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка операций с балансом');
    }
};

export const editWithdraw = (withdraw: IWithdraws) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(withdraw);

    try {
        const {data} = await axios.put<IWithdraws>(`${back_url}a/transaction/${withdraw.id}/`, body, config);
        dispatch(adminActions.edit_withdraw(data));
        successMessage('Информация об операции успешно отредактирована');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования оперции');
    }
};

export const createDesign = (design: IDesigns) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(design);

    try {
        const {data} = await axios.post<IDesigns>(`${back_url}a/design/create/`, body, config);
        dispatch(adminActions.create_design(data));
        successMessage('Дизайн успешно добавлен');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка добавления дизайна');
    }
};

export const editDesign = (design: IDesigns) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(design);

    try {
        const {data} = await axios.put<IDesigns>(`${back_url}a/design/update/${design.id}/`, body, config);
        dispatch(adminActions.edit_designs(data));
        successMessage('Информация о дизайне успешно обновлена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования данных');
    }
};

export const getDesigns = (category = '', status = '', page = 1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IDesigns[], count: number }>(`${back_url}a/designs/?category=${category}&status=${status}&page=${page}`, config);
        await dispatch(adminActions.get_designs(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка дизайнов');
    }
};

export const getDesignsCategories = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IDesignCategories[], count: number }>(`${back_url}a/design-categories/`, config);
        await dispatch(adminActions.get_design_categories(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка категорий дизайна');
    }
};

export const createCategory = (data: IDesignCategories) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(data);

    try {
        const {data} = await axios.post<IDesignCategories>(`${back_url}a/design-category/create/`, body, config);
        dispatch(adminActions.create_design_categories(data));
        successMessage('Категория успешно добавлена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка добавления категории');
    }
};

export const deleteCategory = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        await axios.delete(`${back_url}a/design-category/delete/${id}/`, config);
        dispatch(adminActions.delele_design_categories(id));
        successMessage('Категория успешно удалена');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка удаления категории');
    }
};

export const getMiniOrders = (status = '', page=1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IOrder[], count: number }>(`${back_url}a/miniorders/?type_mini=${status}&page=${page}`, config);
        await dispatch(adminActions.get_mini(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка заказов');
    }
};

export const editMiniOrder = (mini: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(mini);

    try {
        const {data} = await axios.put<IOrder>(`${back_url}a/edit-order/${mini.id}/`, body, config);
        dispatch(adminActions.edit_mini(data));
        successMessage('Заказ успешно отредактирован');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования заказа');
    }
};

export const createMiniOrder = (mini: IOrder) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(mini);

    try {
        const {data} = await axios.post<IOrder>(`${back_url}a/orders/`, body, config);
        dispatch(adminActions.create_mini(data));
        successMessage('Заказ успешно создан');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка создания заказа');
    }
};

export const getValues = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IValues[], count: number }>(`${back_url}a/mini/`, config);
        await dispatch(adminActions.get_values(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка цен');
    }
};

export const editValues = (values: IValues[]) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(values);

    try {
        const {data} = await axios.put<IValues[]>(`${back_url}a/mini/update/`, body, config);
        dispatch(adminActions.get_values(data));
        successMessage('Цены успешно отредактированы');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования цен');
    }
};

export const getUsdValues = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<{ results: IValues[], count: number }>(`${back_url}a/miniusd/`, config);
        await dispatch(adminActions.get_usd_values(data.results))
        await dispatch(adminActions.set_count(data.count))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка цен');
    }
};

export const editUsdValues = (values: IValues[]) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(values);

    try {
        const {data} = await axios.put<{ results: IValues[] }>(`${back_url}a/miniusd/update/`, body, config);
        dispatch(adminActions.get_usd_values(data.results));
        successMessage('Цены успешно отредактированы');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования цен');
    }
};

export const getStats = (page = 1) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<IMonthStats[]>(`${back_url}a/stats/?page=${page}`, config);
        await dispatch(adminActions.get_stats(data))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения статистики');
    }
};

export const getPeriodStats = (data: {period: string, work: string}) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    const body = JSON.stringify(data);

    try {
        const {data} = await axios.post<IStatsDetail>(`${back_url}a/stats/`, body, config);
        dispatch(adminActions.get_period(data))
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения статистики');
    }
};

export const getWorkers = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<IWorkers[]>(`${back_url}a/workers/`, config);
        await dispatch(adminActions.get_workers(data))
    } catch (e) {
        console.log(e);
    }
};

export const sendMessages = (data: string) => () => {
    const config = conf(localStorage.getItem('access'));
    axios.post(`${back_url}a/tg-news/`, {
        'message': data
    }, config).then(res => {
        if (res.data.status === 'ok') {
            successMessage('Сообщения успешно отправлены');
        } else {
            errorMessage('Ошибка отправки сообщений');
        }
    }).catch(e => {
        console.log(e);
        errorMessage('Ошибка отправки сообщений');
    });
};

export const getTemplates = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<ITemplates>(`${back_url}a/templates/1/`, config);
        dispatch(adminActions.get_templates(data))
    } catch (e) {
        console.log(e);
    }
};

export const editTemplates = (template: ITemplates) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(template);

    try {
        const {data} = await axios.put<ITemplates>(`${back_url}a/templates/edit/1/`, body, config);
        dispatch(adminActions.get_templates(data));
        successMessage('Изменения сохранены');
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка редактирования');
    }
};

export const getUserStatistics = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    try {
        const {data} = await axios.get<IUserStats>(`${back_url}a/user/stats/`, config);
        dispatch(adminActions.get_users_stats(data))
    } catch (e) {
        console.log(e);
    }
};