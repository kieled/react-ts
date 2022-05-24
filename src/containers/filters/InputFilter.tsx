import React, {FC} from 'react';
import {Form, Input} from "antd";

type Props = {
    onChange: (type: number, value: string) => void
    type: number
    text: string
}


const InputFilter: FC<Props> = ({onChange, type, text}) => {
    return (
        <Form.Item className='admin-input'>
            <Input onChange={(e) => onChange(type, e.target.value)}
                   placeholder={text}/>
        </Form.Item>
    )
}

export default InputFilter