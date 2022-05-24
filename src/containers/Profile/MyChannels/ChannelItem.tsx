import React, {FC} from 'react'
import {Button, Col, Row} from "antd"
import {YoutubeFilled} from "@ant-design/icons"
import IChannel from "../../../models/Users/IChannel"

type Props = {
    item: IChannel
}


const ChannelItem:FC<Props> = ({item}) => {
    return (
        <Col span={11} className="yt-card">
            <Row align={"middle"} className="yt-body-card">
                <Col span={3}>
                    <YoutubeFilled className="yt-channels-icon"/>
                </Col>
                <Col span={3}>
                    <div className="white-tag">ID</div>
                    <div className="white">{item.id}</div>
                </Col>
                <Col span={6}>
                    <div className="white-tag">Название</div>
                    <div className="white">{item.name}</div>
                </Col>
                <Col span={6} offset={1} className="yt-mobile-subs">
                    <div className="white-tag">Подписчиков</div>
                    <div className="white">{item.subs}</div>
                </Col>
                <Col span={5}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                        <Button className="yt-open-btn">Открыть</Button>
                    </a>
                </Col>
            </Row>
        </Col>
    )
}

export default ChannelItem