import React, {FC} from 'react';
import {Button, Table, TablePaginationConfig} from "antd";
import IWorkers from "../../../models/Admin/IWorkers";
import IApp from "../../../models/Admin/IApp";


type Props = {
    workers: IWorkers[]
    setCurrent: (current: number) => void
    current: number
    apps: IApp[]
    isLoading: boolean
    onOpenModal: (value: number) => void
    count: number
}


const AppsList: FC<Props> = ({workers, setCurrent, current, apps, isLoading, onOpenModal, count}) => {

    const onPaginate = (newPagination: TablePaginationConfig) => {
        setCurrent(newPagination.current || 1)
    }

    const getStatusId = (id: number) => {
        if (apps) {
            try {
                const app = apps?.find((app: IApp) => app.id === id)?.status
                return getStatus(app ? app : '0')
            } catch (err) {
                return null
            }
        } else {
            return null
        }
    }

    const getStatus = (status: string) => {
        if (status === '1') {
            return 'Активно'
        } else if (status === '2') {
            return 'В процессе'
        } else if (status === '3') {
            return 'На модерации'
        } else if (status === '4') {
            return 'Выполнена'
        } else if (status === '5') {
            return 'Отклонена'
        } else if (status === '6') {
            return 'Просрочена'
        }
    };

    const getClassStatus = (id: number) => {
        try {
            const status = apps?.find((app: IApp) => app.id === id)?.status
            const number = parseInt(status || '0')
            if (number === 1) {
                return 'admin-apps-active-btn'
            } else if (number === 2) {
                return 'admin-apps-process-btn'
            } else if (number === 3) {
                return 'admin-apps-moderate-btn'
            } else if (number === 4) {
                return 'admin-apps-success-btn'
            } else if (number === 5) {
                return 'admin-apps-cancel-btn'
            } else if (number === 6) {
                return 'admin-apps-expired-btn'
            }
        } catch (err) {
            return ''
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Дата создания',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Тип заказа',
            dataIndex: 'name',
            key: 'name',
            render: (item: string) => <>{item === 'None+' ? 'прямая покупка' : item}</>
        },
        {
            title: 'Сотрудник',
            dataIndex: 'owner',
            key: 'owner',
            render: (item: string) => < > {
                workers?.find((worker: IWorkers) => worker.id === parseInt(item))?.name} </>
        },
        {
            title: 'Оплата',
            dataIndex: 'price_by_channel',
            key: 'price_by_channel',
            render: (item: string) => <>{item}р</>
        },
        {
            title: 'Статус',
            dataIndex: 'id',
            key: 'status',
            render: (item: string) =>
                <Button className={`admin-status-btn ` + getClassStatus(parseInt(item))}
                        onClick={() => {
                            onOpenModal(parseInt(item))
                        }}>
                    {getStatusId(parseInt(item))}
                </Button>
        },
    ];

    return (
        <Table sticky={true} pagination={{current: current, pageSize: 10, total: count}}
               rowKey={record => record.id}
               columns={columns} className='admin-apps-table'
               dataSource={apps} onChange={onPaginate}
               loading={isLoading}
        />
    );
};

export default AppsList;