import React from 'react';
import { List, Avatar, Typography, Divider, Card } from 'antd';
import {
    UserOutlined,

} from '@ant-design/icons';
import './Participants.scss'
const ParticipantsPanel = () => {
    const participants = [
        {
            name: 'Muhammad Ali',
            email: 'MuhammadAli@gmail.com',
            avatar: <UserOutlined />
        },
        {
            name: 'Hassan',
            email: 'MuhammadAli@gmail.com',
            avatar: <UserOutlined />
        },
        {
            name: 'Abdul Rehman',
            email: 'abdul@gmail.com',
            avatar: <UserOutlined />
        },
    ];

    return (
        <Card title="Participants" className="participants-container">
            <List
                itemLayout="horizontal"
                dataSource={participants}
                renderItem={(participant) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={participant.avatar}
                            title={<Typography.Text>{participant.name}</Typography.Text>}
                            description={<Typography.Text>{participant.email}</Typography.Text>}
                        />
                    </List.Item>
                )}
            />
        </Card>

    );
};

export default ParticipantsPanel;