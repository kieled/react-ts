import React, {useEffect, useState} from "react";
import {Button, Row, Col, Switch} from "antd";
import {Link} from "react-router-dom";
import {load_user, changeFastStatus} from "../../actions/auth";
import {YoutubeFilled} from "@ant-design/icons";
import "../../css/ui.css";
import IChannel from "../../models/Users/IChannel";
import {useAppDispatch, useAppSelector} from "../../hooks";


const MyChannels = () => {
    const {channels, user} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()


    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            document.title = "Мои каналы"
            await dispatch(load_user())
        }

        onLoad().then(() => setIsLoading(false))
    }, [  ])

    if (isLoading) {
        return null
    }

    return (
        <>
            <h2 className="yt-title"> Мои каналы </h2>
            <Row>
                <Col span={4} className="add-channel-mobile">
                    <Button className="channel-add-btn">
                        <Link to="/add"> Добавить канал </Link>
                    </Button>
                </Col>
                <Col span={12} className="change-mini-status-switch">
                    <div className="status-mini-switch-text">
                        Разрешить быстрый выкуп каналов.Подробнее о быстром выкупе -
                        Читать
                    </div>
                    <Switch onChange={(e) => dispatch(changeFastStatus(e))}
                        checked={user?.is_minimarket}/>
                </Col>
            </Row>
            <Row className="yt-list">

                {channels.filter((channel) => channel.status === '1').map((item: IChannel) => {
                    return (
                        <Col span={11} className="yt-card" key={item.id}>
                            <Row align={"middle"} className="yt-body-card">
                                <Col span={3}>
                                    <YoutubeFilled className="yt-channels-icon"/>
                                </Col>
                                <Col span={3}>
                                    <div className="white-tag"> ID</div>
                                    <div className="white"> {item.id} </div>
                                </Col>
                                <Col span={6}>
                                    <div className="white-tag"> Название</div>
                                    <div className="white"> {item.name} </div>
                                </Col>
                                <Col span={6} offset={1} className="yt-mobile-subs">
                                    <div className="white-tag"> Подписчиков</div>
                                    <div className="white"> {item.subs} </div>
                                </Col>
                                <Col span={5}>
                                    <a href={item.url} target="_blank" rel="noreferrer">

                                        <Button className="yt-open-btn"> Открыть </Button>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

export default MyChannels
