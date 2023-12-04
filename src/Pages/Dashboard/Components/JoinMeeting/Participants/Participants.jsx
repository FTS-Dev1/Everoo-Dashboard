import React from 'react';
import { List, Avatar, Typography, Divider, Card } from 'antd';
import {
    UserOutlined,

} from '@ant-design/icons';
import participant from 'Assets/Svgs/CallingIcons/participants.svg'
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
        <Card className="participants-container">
        <div className="card-header">
            <img src={participant} alt="Participant Image" className="header-image" width={20} />
            <p style={{paddingLeft:"10px"}}>Participants</p>
        </div>
        <div className='card-body'>
        <List
            itemLayout="horizontal"
            dataSource={participants}
            renderItem={(participant) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar size={40} icon={<UserOutlined />} />}
                        title={<Typography.Text>{participant.name}</Typography.Text>}
                        description={<Typography.Text>{participant.email}</Typography.Text>}
                    />
                </List.Item>
            )}
        />
        </div>
        
    </Card>
    

    );
};

export default ParticipantsPanel;