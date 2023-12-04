import React, { useState } from 'react';
import { Row, Col, Button, Avatar, Layout, Card, } from 'antd';
import {
    AudioMutedOutlined,
    VideoCameraOutlined,
    CloseCircleOutlined,
    UserOutlined,
    AudioOutlined,
    VideoCameraAddOutlined,
    MessageOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { BsCameraVideoOff } from 'react-icons/bs'
import { MdOutlineScreenShare } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { HiOutlineChat } from 'react-icons/hi'
import { TfiBlackboard } from 'react-icons/tfi'
import { PiSpeakerSimpleHighFill } from 'react-icons/pi'
import AgoraRTC from 'agora-rtc-sdk-ng';
import ParticipantsPanel from './Participants/Participants';
import ChatUI from './Chat/Chat';
import './Calling.scss';
import chat from 'Assets/Svgs/CallingIcons/chat.svg'
import mic from 'Assets/Svgs/CallingIcons/mic.svg'
import participants from 'Assets/Svgs/CallingIcons/participants.svg'
import raisehand from 'Assets/Svgs/CallingIcons/raisehand.svg'
import react from 'Assets/Svgs/CallingIcons/react.svg'
import record from 'Assets/Svgs/CallingIcons/record.svg'
import screenShare from 'Assets/Svgs/CallingIcons/screenShare.svg'
import speaker from 'Assets/Svgs/CallingIcons/speaker.svg'
import videoplayer from 'Assets/Svgs/CallingIcons/videoplayer.svg'
import whiteboard from 'Assets/Svgs/CallingIcons/whiteboard.svg'

const { Footer, Sider, Content } = Layout;
const CallMeeting = () => {
    const [showParticipants, setShowParticipants] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    let videoTrack;

    const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        // Add more users as needed
    ];

    const toggleParticipants = () => {
        setShowParticipants(!showParticipants);
    };

    // const buttonsData = [
    //     { icon: <MdOutlineScreenShare size={20} />, text: 'Screen Share' },
    //     { icon: <FaUsers  size={20}/>, text: 'Participants', onClick: toggleParticipants },
    //     { icon: <HiOutlineChat size={20}/>, text: 'Chats' },
    //     { icon: <TfiBlackboard size={20}/>, text: 'White Board' },
    //     { icon: <PiSpeakerSimpleHighFill size={20}/>, text: 'Speaker' },
    // ];
    const buttonsData = [
        { icon: screenShare, text: 'Screen Share' },
        { icon: speaker, text: 'Speaker' },
        { icon: participants , text: 'Participants', onClick: toggleParticipants },
        { icon: chat , text: 'Chats' },
        { icon: whiteboard , text: 'White Board' },
        { icon: record,  text: 'Record' },
        { icon: react,  text: 'React' },
        { icon: raisehand,  text: 'Raise Hand' },
    ];



    const turnOnCamera = async (flag) => {
        flag = flag ?? !isVideoOn;
        setIsVideoOn(flag);

        if (videoTrack) {
            return videoTrack.setEnabled(flag);
        }
        videoTrack = await AgoraRTC.createCameraVideoTrack();
        videoTrack.play("camera-video");
    };

    return (
        <>
            <Layout>
                <Layout>
                    <Content >
                        <div className="CallingContainer">
                            <div className='userContainer'>
                                <div className='user-box'>
                                    <Avatar size={100} icon={<UserOutlined />} />
                                    User 1
                                    <div className="mic-icon">
                                    <Button className='usericonButton' ><img src={mic} alt="Error" width={25} /></Button>
                                    </div>

                                </div>
                                <div className='user-box'>
                                    {isVideoOn ? (
                                        <video width="100%" height="100%" id="camera-video" hidden={!isVideoOn}></video>
                                    ) : (
                                        <>
                                            <Avatar size={100} icon={<UserOutlined />} />
                                            User 2
                                        </>
                                    )}
                                    <div className="video-icon">
                                        <Button className='iconButton' ><img src={mic} alt="Error" width={25} /></Button>
                                        <Button className='iconButton' onClick={() => turnOnCamera()} ><img src={videoplayer} alt="Error" width={25} /></Button>
                                    </div>
                                </div>
                                <div className='actionBar'>
                                    <div className='actionButtons'>
                                        {buttonsData.map((button, index) => (
                                            <div key={index} style={{ textAlign: 'center' }}>
                                                <Button className='iconButton' onClick={button.onClick} danger={button.danger}> <img src={button.icon} alt="Error" width={27} /></Button>
                                                <h6 style={{ paddingTop: '10px' }}>{button.text}</h6>
                                            </div>
                                        ))}
                                        <Button className='leaveButton' danger>Leave Meeting</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
                {showParticipants && (
                    <Sider width={350} theme='light'> <div style={{ paddingTop: '30px' }}>
                        <div className='userContainer'>
                            <ParticipantsPanel />
                            <Card title="chats" className="participants-container" style={{ marginTop: '30px' }}>
                                <ChatUI />
                            </Card>
                        </div>
                    </div>
                    </Sider>
                )}
            </Layout>

        </>

    );
};

export default CallMeeting;
