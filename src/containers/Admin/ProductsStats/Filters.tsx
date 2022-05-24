import React, {FC} from 'react';
import {Select} from "antd";

const {Option} = Select

type Props = {
    onFilterPeriod: (value: string) => void
    onFilterWork: (value: string) => void
}

const Filters: FC<Props> = ({
                     onFilterPeriod,
                     onFilterWork
                 }) => {
    return (
        <div className="filters">
            <Select
                className="filter-select"
                onChange={onFilterPeriod}
                defaultValue="0"
            >
                <Option key="0" value="0">С начала месяца</Option>
                <Option key="1" value="7">1 день</Option>
                <Option key="2" value="1">7 дней</Option>
                <Option key="3" value="2">14 дней</Option>
                <Option key="4" value="3">Месяц</Option>
                <Option key="5" value="4">Два месяца</Option>
                <Option key="6" value="5">Три месяца</Option>
                <Option key="7" value="6">Пол года</Option>
            </Select>
            <Select
                className="filter-select"
                onChange={onFilterWork}
                defaultValue="0"
            >
                <Option key="0" value="0">Площадка(Все)</Option>
                <Option key="1" value="1">Trade Groups</Option>
                <Option key="2" value="2">Accs Market</Option>
                <Option key="3" value="3">Garant Market</Option>
                <Option key="4" value="4">Fun Pay</Option>
                <Option key="5" value="5">Другие</Option>
                <Option key="6" value="6">Партнеры</Option>
                <Option key="7" value="7">Mini Market</Option>
            </Select>
        </div>
    );
};

export default Filters;