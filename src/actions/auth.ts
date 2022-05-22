import axios from "axios";
import {conf, errorMessage, successMessage} from "./admin";
import {AppDispatch} from "../store";
import {authActions} from "../reducers/auth";
import IUser from "../models/Users/IUser";
import IOrder from "../models/Users/IOrder";
import IChannel from "../models/Users/IChannel";
import ITransaction from "../models/Users/ITransaction";
import IRating from "../models/Users/IRating";
import IWithdrawTemplates from "../models/Users/IWithdrawTemplates";

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

const back_url = process.env.REACT_APP_API_URL

export const checkAuthenticated = () => async (dispatch: AppDispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })

        try {
            const res = await axios.post(`${back_url}auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                await dispatch(authActions.authenticated_success())
            }
        } catch (e) {
            console.log(e);
            await dispatch(authActions.authentication_failed())
        }
    }
};

export const load_user = () => async (dispatch: AppDispatch) => {
    if (localStorage.getItem('access')) {
        const config = conf(localStorage.getItem('access'))
        try {
            const {data} = await axios.get<IUser>(`${back_url}auth/users/me/`, config);
            await dispatch(authActions.load_user_success(data))
        } catch (e) {
            console.log(e);
            await dispatch(logout());
        }
    } else {
        await dispatch(authActions.authentication_failed())
        await dispatch(logout());
    }
};


export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        username,
        password
    });

    try {
        const res = await axios.post(`${back_url}auth/jwt/create/`, body, config);
        if (res.data.detail === 'No active account found with the given credentials') {
            errorMessage('Ваш аккаунт не активирован');
        } else {
            await dispatch(authActions.login_success(res.data));
            successMessage('Вы успешно авторизованы');

            await dispatch(load_user());
        }
    } catch (e) {
        console.log(e);
        await dispatch(authActions.authentication_failed())
        errorMessage('Не верные логин или пароль');
    }
};

export const changeFastStatus = (status: boolean) => async () => {
    const config = conf(localStorage.getItem('access'))

    try {
        await axios.post(`${back_url}api/fast-status/`,
            {'status': status}, config);
        successMessage('Изменения успешно сохранены');
    } catch (e) {
        console.log(e);
        errorMessage('Внутренняя ошибка');
    }
};

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(authActions.authentication_failed());
};

export const getOrders = (type = '', type_content = '', moderate = '') => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    try {
        const res = await axios
            .get<{results: IOrder[]}>(
                `${back_url}api/?type=${type}&type_content=${type_content}&moderation=${moderate}`, config
            )
        await dispatch(authActions.get_orders(res.data.results));
    } catch (e) {
        console.log(e);
        errorMessage('Ошибка получения списка заявок');
    }
};


export const getOrder = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get<IOrder>(`${back_url}api/order/${id}/`, config)
        .then(res => {
            dispatch(authActions.get_order(res.data));
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка получения информации о заявке');
        });
};


export const createOrder = (e: any) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.put(`${back_url}api/create/` + e.order + '/', {
        channel: e.channel
    }, config)
        .then(() => {
            dispatch(authActions.create_order(e.order));
            successMessage('Заявка успешно создана');
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка создания заявки');
        })
};

export const cancelOrder = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get(`${back_url}api/cancel/` + id + '/', config)
        .then(() => {
            dispatch(authActions.cancel_order(id));
            successMessage('Заявка успешно отменена');
        }).catch(e => {
            console.log(e);
            errorMessage('Внутренняя ошибка');
        });
};

export const expiredOrder = () => async () => {
    const config = conf(localStorage.getItem('access'))
    try {
        const res = await axios.get(`${back_url}api/expired/`, config)
        if (res.data.status !== 'ok') {
            errorMessage('Внутренняя ошибка');
        }
    } catch (e) {
        console.log(e);
        errorMessage('Внутренняя ошибка');
    }
};

export const acceptOrder = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get(`${back_url}api/accept/` + id + '/', config)
        .then(() => {
            dispatch(authActions.accept_order(id));
            successMessage('Заявка успешно принята');
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка принятия заявки');
        });
};

export const confirmOrder = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get(`${back_url}api/moderate/${id}/`, config)
        .then(() => {
            dispatch(authActions.confirm_order(id));
            successMessage('Заявка успешно отправлена на модерацию');
        }).catch(e => {
            console.log(e);
            errorMessage('Внутренняя ошибка');
        });
};

export const getChannelsForOrders = (id: number) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get<IChannel[]>(`${back_url}api/actual-channels/${id}/`, config)
        .then(res => {
            dispatch(authActions.get_channels(res.data));
        }).catch(() => errorMessage('Ошибка получения списка каналов'));
};

export const loadData = (url: string) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = {
        url: url
    }
    await axios.post<IChannel>(`${back_url}api/load-data/`, body, config)
        .then(res => {
            dispatch(authActions.get_channel_data(res.data));
        }).catch(e => {
            console.log(e)
            errorMessage('Неверная ссылка на канал');
        });
};

export const addChannel = (url: string) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = {
        url: url
    }
    await axios.post<IChannel>(`${back_url}api/create-channel/`, body, config)
        .then(res => {
            dispatch(authActions.create_channel(res.data));
            successMessage('Канал успешно добавлен');
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка добавления канала');
        });
};

export const withdraw = (data: ITransaction) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    const body = JSON.stringify(data);
    await axios.post<ITransaction>(`${back_url}api/balance/`, body, config)
        .then((res) => {
            dispatch(authActions.create_transaction(res.data));
            successMessage('Заявка на вывод успешно создана');
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка создания заявки на вывод (либо не достаточно средств на балансе)');
        });
};

export const getRating = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get<IRating>(`${back_url}api/rating/`, config)
        .then(res => {
            dispatch(authActions.get_rating(res.data));
        }).catch(e => {
            console.log(e);
            errorMessage('Внутренняя ошибка');
        });
};

export const getWithdrawTemplates = () => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))
    await axios.get<IWithdrawTemplates>(`${back_url}api/withdraw-templates/`, config)
        .then(res => {
            dispatch(authActions.get_templates(res.data));
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка получения информации о заявке');
        });
};


export const updateWithdrawTemplates = (data: IWithdrawTemplates) => async (dispatch: AppDispatch) => {
    const config = conf(localStorage.getItem('access'))

    const body = JSON.stringify(data)
    await axios.post<IWithdrawTemplates>(`${back_url}api/withdraw-templates/`, body, config)
        .then(res => {
            dispatch(authActions.get_templates(res.data));
            successMessage('Данные успешно сохранены');
        }).catch(e => {
            console.log(e);
            errorMessage('Ошибка редактирования');
        })
};