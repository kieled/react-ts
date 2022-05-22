import React, {useEffect, useState} from "react";
import {Form, Input, Typography, Col, Row, Button} from 'antd';
import {loadData, addChannel} from "../../actions/auth";
import {Navigate} from "react-router-dom";
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from "../../hooks";

const {Text} = Typography;

const AddChannel = () => {
    const {channel} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    
    const [random] = useState(Math.round(10000 + Math.random() * (99999 - 10000) * 10))
    const [redirect, setRedirect] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        document.title = 'Добавление канала'
    }, [])

    const onFinish = async (e: any) => {
        await dispatch(loadData(e.url))
        if (parseInt(channel?.statusgroup || '0') === random) {
            dispatch(addChannel(e.url))
            setRedirect(true)
        } else {
            toast.error('Вы не указали код в описании канала!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const onSearch = async (e: any) => {
        await dispatch(loadData(e.target.value))
        if (channel !== null) {
            if (channel.subs < 500) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        } else {
            setDisabled(true)
        }
    }

    if (redirect) {
        return <Navigate to="/channels"/>
    }
    return (
        <>
            <Row className="align-center add-channel-mobile-block">
                <Col span={16}>
                    <h2 className="title mb10px"> Мои каналы </h2>
                    <h3 className="add-channel-body-text"> Добавление канала </h3>
                    <p className="add-text-desctiption"> Вставьте в описание проверочный код:
                        <Text copyable className="copy-code">{random}</Text>
                    </p>
                    <Form onFinish={onFinish} autoComplete="off">
                        <Row className="d-block">
                            <Col span={16} className="yt-add-url-mobile">
                                <Form.Item name="url" className="admin-input form-yt-add-url"
                                           rules={[{required: true, message: 'Введите ссылку на канал!'}]}>
                                    <Input onChange={onSearch}
                                           placeholder="https://youtube.com/channel/gadgasdgk"/>
                                </Form.Item>
                            </Col>
                            <Form.Item className="form-yt-add-btn">
                                <Button className="add-yt-channel-btn" htmlType="submit"
                                        disabled={disabled}> {disabled ? 'От 500 подп.' : 'Добавить'}
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
                <Col span={8}>
                    <div className="info-yt-card-add">
                        <div className="info-card-content">
                            <Row>
                                <h3 className="info-card-title"> Парамерты канала </h3>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="info-card-subtitle"> Название</div>
                                    <div className="channel-info-values"> {
                                        channel !== null ? channel.name : '-'} </div>
                                </Col>
                                <Col span={12}>
                                    <div className="info-card-subtitle"> Количество подп</div>
                                    <div className="channel-info-values"> {
                                        channel !== null ? channel.subs : '-'} </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}


export default AddChannel