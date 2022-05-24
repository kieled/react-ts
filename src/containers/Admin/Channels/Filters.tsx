import React, {FC} from 'react';
import {Col, Input, Row, Select} from "antd";
import IWorkers from "../../../models/Admin/IWorkers";
import InputFilter from "../../filters/InputFilter";

const {Search} = Input;

type Props = {
    onWorkerFilter: (value: string) => void
    workers: IWorkers[]
    onIDFilter: (value: string) => void
    onFilterCount: (type: number, value: string) => void
}

const Filters: FC<Props> = ({
                     onWorkerFilter,
                     workers,
                     onIDFilter,
                     onFilterCount
                 }) => {
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Select className="admin-select-filter"
                        onChange={onWorkerFilter} allowClear
                        placeholder='Выберите сотрудника'> {workers.map((worker: IWorkers) => {
                    return <Select.Option key={worker.id} value={worker.id}> {worker.name}</Select.Option>
                })}
                </Select>
            </Col>
            <Col span={8}>
                <Search className="admin-channels-search m0"
                        placeholder="Введите ID, название канала или url" onSearch={onIDFilter}/>
            </Col>
            <Col span={4}>
                <InputFilter onChange={onFilterCount} type={1} text='От' />
            </Col>
            <Col span={4}>
                <InputFilter onChange={onFilterCount} type={2} text='До'/>
            </Col>
        </Row>
    );
};

export default Filters;