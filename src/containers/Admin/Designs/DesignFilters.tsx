import React, {FC} from 'react';
import {Col, Row, Select} from "antd";
import IDesignCategories from "../../../models/Admin/IDesignCategories";

type Props = {
    onCategoryFilter: (category: string) => void
    design_categories: IDesignCategories[]
    onStatusFilter: (status: string) => void
    setIsModalVisible: (value: boolean) => void
}

const {Option} = Select

const DesignFilters: FC<Props> = ({onCategoryFilter, design_categories, onStatusFilter, setIsModalVisible}) => {
    return (
        <Row>
            <Col span={6}>
                <Select className="admin-select-filter" style={{width: '97%'}}
                        onChange={onCategoryFilter} allowClear
                        placeholder='Выберите категорию'>
                    {design_categories?.map((category: IDesignCategories) => {
                        return <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    })}
                </Select> </Col>
            <Col span={6}>
                <Select className="admin-select-filter"
                        style={{width: '95%'}}
                        onChange={onStatusFilter}
                        allowClear placeholder='Выберите статус'>
                    <Option key='1' value='1'> Активно </Option>
                    <Option key='2' value='2'> Использовано </Option>
                    <Option key='3' value='3'> Зарезервировано </Option>
                </Select>
            </Col>
            <Col span={3} offset={9}>
                <button className="admin-design-upload-btn" style={{width: '95%'}}
                        onClick={() => setIsModalVisible(true)}> Загрузить
                </button>
            </Col>
        </Row>
    );
};

export default DesignFilters;