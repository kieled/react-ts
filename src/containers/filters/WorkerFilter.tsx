import React, {FC} from 'react';
import IWorkers from "../../models/Admin/IWorkers";
import {Select} from "antd";


type Props = {
    workers: IWorkers[]
    onFilter: (value: string) => void
}

const WorkerFilter: FC<Props> = ({workers, onFilter}) => {
    return (
        <Select className='admin-select-filter' onChange={onFilter}
                allowClear placeholder='Выберите сотрудника'>
            {workers?.map((worker) => {
                return <Select.Option key={worker.id}
                               value={worker.id}> {worker.name} </Select.Option>
            })}
        </Select>
    );
};

export default WorkerFilter;