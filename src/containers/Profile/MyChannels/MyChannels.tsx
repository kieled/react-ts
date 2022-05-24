import React, {useEffect, useState} from "react"
import {Button, Row, Col, Switch} from "antd"
import {Link} from "react-router-dom"
import {load_user, changeFastStatus} from "../../../actions/auth"
import "../../../css/ui.css"
import IChannel from "../../../models/Users/IChannel"
import {useAppDispatch, useAppSelector} from "../../../hooks"
import ChannelItem from "./ChannelItem";


const MyChannels = () => {
    const {user} = useAppSelector(state => state.authSlice)
    const channels = useAppSelector(state => state.authSlice.channels.filter(c => c.status === '1'))
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function onLoad() {
            document.title = "Мои каналы"
            await dispatch(load_user())
        }

        onLoad().then(null)
    }, [  ])

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
                {channels.map((item: IChannel) => {
                    return (
                        <ChannelItem item={item} key={item.id} />
                    )
                })}
            </Row>
        </>
    )
}

export default MyChannels
