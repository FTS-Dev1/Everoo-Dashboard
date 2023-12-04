import React, { useState } from "react";
import { List, Input, Button, Avatar } from "antd";
import './Chat.scss'
import { SendOutlined } from '@ant-design/icons';

const ChatUI = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage) {
            setMessages([...messages, { message: newMessage, isSender: true }]);
            setNewMessage('');
        }
    };


    return (
        <>
            <div className="chat-app">
                {/* <List
                    dataSource={messages}
                    renderItem={(item, index) => (
                        <List.Item className={item.isSender ? ' message sender' : ' message receiver'}>
                            <List.Item.Meta class="message-content"
                                description={item.message}
                            />
                        </List.Item>
                    )}
                /> */}
                <div class="message receiver">
                    <div class="message-content">Hello! This is a received message.</div>
                </div>
                <div class="message sender">
                    <div class="message-content">Hi there! This is a sent message.</div>
                </div>


            </div>
                <div className="input-box">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write message..."
                        onPressEnter={handleSend}
                    />
                    <Button type="primary" onClick={handleSend} icon={<SendOutlined />} />
                </div>


        </>
    );
};

export default ChatUI;