import React, { useRef, useState, useEffect } from "react";

// ANT-D | MUI :
import { Row, Col, Button, Avatar, Layout, Card, } from 'antd';

// Assets | ICONS :
import { BsCameraVideoOff } from 'react-icons/bs'
import { MdOutlineScreenShare } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { HiOutlineChat } from 'react-icons/hi'
import { TfiBlackboard } from 'react-icons/tfi'
import { PiSpeakerSimpleHighFill } from 'react-icons/pi'
import { VideoCameraOutlined, UserOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

// Components :
import ParticipantsPanel from './Participants/Participants';
import ChatUI from './Chat/Chat';

// AGORA :
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

// API :
import { StartPaidMeetingAPI } from "API/meeting";
// Redux :
import { useSelector } from "react-redux";

// CSS :
import "./VideoPlayer.scss";

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






const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let audioTrack;
let videoTrack;
let screenTrack;

const { Footer, Sider, Content } = Layout;
const VideoPlayer = ({ meetingData }) => {

  let UserData = useSelector(state => state.userData);

  const [isAdmin, setIsAdmin] = useState(null);
  const [participantsData, setParticipantsData] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChats, setShowChats] = useState(false);


  const [userData, setUserData] = useState(null)
  const [clientData, setClientData] = useState(null)



  // const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const [isScreenOn, setIsScreenOn] = useState(false);

  const [isAudioPubed, setIsAudioPubed] = useState(false);
  const [isVideoPubed, setIsVideoPubed] = useState(false);

  const [isVideoSubed, setIsVideoSubed] = useState(false);
  const [isAudioSubed, setIsAudioSubed] = useState(false);



  const toggleParticipants = () => {
    setShowChats(false)
    setShowParticipants(!showParticipants);
  };
  const toggleChats = () => {
    setShowParticipants(false)
    setShowChats(!showChats);
  };
  const fullScreen = () => {
    console.log("CLICKED");
    let VideoPlayer = document.getElementById("remote-video")
    VideoPlayer.requestFullscreen()
  };


  // const turnOnCamera = async (flag) => {
  //   flag = flag ?? !isVideoOn;
  //   setIsVideoOn(flag);

  //   if (videoTrack) {
  //     return videoTrack.setEnabled(flag);
  //   }
  //   videoTrack = await AgoraRTC.createCameraVideoTrack();
  //   videoTrack.play("camera-video");
  // };

  // const turnOnMicrophone = async (flag) => {
  //   flag = flag ?? !isAudioOn;
  //   setIsAudioOn(flag);

  //   if (audioTrack) {
  //     return audioTrack.setEnabled(flag);
  //   }

  //   audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  //   // audioTrack.play();
  // };

  // const screenShare = async (flag) => {
  //   flag = flag ?? !isScreenOn;
  //   setIsScreenOn(flag);

  //   if (screenTrack) {
  //     return screenTrack.setEnabled(flag);
  //   }
  //   screenTrack = await AgoraRTC.createScreenVideoTrack();
  //   screenTrack.play("screen-video");
  // };


  const [isJoined, setIsJoined] = useState(false);



  const leaveChannel = async () => {
    setIsJoined(false);
    setIsAudioPubed(false);
    setIsVideoPubed(false);

    await client.leave();

    await StartPaidMeetingAPI(meetingData?._id)


    window.location.href = "/dashboard/meetings"

  };

  const onUserPublish = async (user, mediaType) => {
    if (mediaType === "video") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play("remote-video");
      setIsVideoSubed(true);
    }
    if (mediaType === "audio") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play();
      setIsAudioSubed(true);
    }
  };
  const onUserUnPublish = async (user, mediaType) => {
    if (mediaType === "video") {
      const remoteTrack = await client.unsubscribe(user, mediaType);
      // remoteTrack.play("remote-video");
      setIsVideoSubed(false);
    }
    if (mediaType === "audio") {
      const remoteTrack = await client.unsubscribe(user, mediaType);
      // remoteTrack.play();
      setIsAudioSubed(false);
    }
  };





  const publishVideo = async () => {
    setIsVideoOn(true);
    if (screenTrack) {
      await client.unpublish(screenTrack);
    }

    videoTrack = await AgoraRTC.createCameraVideoTrack();
    videoTrack.play("camera-video");

    if (!isJoined) {
      await joinChannel();
    }
    await client.publish(videoTrack);
    setIsVideoPubed(true);
  };
  const unPublishVideo = async () => {
    // await turnOnCamera(false);
    setIsVideoOn(false);
    if (videoTrack) {
      videoTrack.setEnabled(false);
    }

    await client.unpublish(videoTrack);
    setIsVideoPubed(false);
  };
  const togglePublishVideo = (flag) => {
    if (flag) {
      publishVideo()
    } else {
      unPublishVideo()
    }
  }


  const publishScreenShare = async () => {
    setIsScreenOn(true);

    if (videoTrack) {
      await client.unpublish(videoTrack)
    }

    setIsVideoOn(true);
    setIsVideoPubed(true);

    screenTrack = await AgoraRTC.createScreenVideoTrack();
    screenTrack.play("camera-video");

    await client.publish(screenTrack)

  };

  const unPublishScreenShare = async () => {
    setIsScreenOn(false);
    setIsVideoOn(false);
    setIsVideoPubed(false);
    if (screenTrack) {
      screenTrack.setEnabled(false)
    }

    await client.unpublish(screenTrack);

    // screenTrack = await AgoraRTC.createScreenVideoTrack();
    // screenTrack.play("camera-video");
  };
  const togglePublishScreenShare = (flag) => {
    if (flag) {
      publishScreenShare()
    } else {
      unPublishScreenShare()
    }
  }

  const publishAudio = async () => {
    // setIsAudioOn(true);

    // if (audioTrack) {
    //   return audioTrack.setEnabled(true);
    // }
    audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    if (!isJoined) {
      await joinChannel();
    }

    await client.publish(audioTrack);
    setIsAudioPubed(true);
  };
  const unPublishAudio = async () => {

    if (audioTrack) {
      audioTrack.setEnabled(false);
    }

    await client.unpublish(audioTrack);
    setIsAudioPubed(false);
  };
  const togglePublishAudio = (flag) => {
    if (flag) {
      publishAudio()
    } else {
      unPublishAudio()
    }
  }




  const joinChannel = async () => {
    if (isJoined) {
      await leaveChannel();
    }

    client.on("user-published", onUserPublish);
    client.on("user-unpublished", onUserUnPublish)

    await client.join(
      "1b1399d5e3e34c3397421642602e1fe3",
      meetingData.roomId,
      null,
      null
    );
    setIsJoined(true);
  };

  useEffect(() => {
    setIsAdmin(meetingData?.admin)
    if (meetingData?.admin?._id == UserData?._id) {
      setUserData(meetingData?.admin)
      setClientData(meetingData?.participants[0])
    } else {
      setClientData(meetingData?.admin)
      setUserData(meetingData?.participants[0])
    }
    setParticipantsData(meetingData?.participants);
    joinChannel()

    return () => {
      leaveChannel()
    }

  }, [])

  // const buttonsData = [
  //   { icon: <MdOutlineScreenShare size={20} />, text: 'Screen Share', onClick: () => togglePublishScreenShare(!isScreenOn) },
  //   { icon: <FaUsers size={20} />, text: 'Participants', onClick: toggleParticipants },
  //   { icon: <HiOutlineChat size={20} />, text: 'Chats', onClick: toggleChats },
  //   { icon: <TfiBlackboard size={20} />, text: 'White Board', onClick: fullScreen },
  //   { icon: <PiSpeakerSimpleHighFill size={20} />, text: 'Speaker' },
  // ];
  const buttonsData = [
    { icon: screenShare, text: 'Screen Share' },
    { icon: speaker, text: 'Speaker' },
    { icon: participants, text: 'Participants', onClick: toggleParticipants },
    { icon: chat, text: 'Chats' },
    { icon: whiteboard, text: 'White Board' },
    { icon: record, text: 'Record' },
    { icon: react, text: 'React' },
    { icon: raisehand, text: 'Raise Hand' },
  ];
  return (
    <>
      <div className="videoContainer">

        <Layout>
          <Layout>
            <Content >
              <div className="CallingContainer">
                <div className='userContainer'>
                  <div className='user-box'>
                    <video width="100%" height="100%" id="remote-video" hidden={!isVideoSubed}></video>
                    {!isVideoSubed &&
                      <>
                        <Avatar size={100} icon={<UserOutlined />} />
                        {clientData?.firstName} {clientData?.lastName}
                        {/* <div className="mic-icon">
                          <AudioOutlined />
                        </div> */}
                        <div className="mic-icon">
                          <Button className='usericonButton' ><img src={mic} alt="Error" width={25} /></Button>
                        </div>
                      </>
                    }
                  </div>
                  <div className='user-box'>
                    <video width="100%" height="100%" id="camera-video" hidden={!isVideoOn}></video>
                    {!isVideoOn &&
                      <>
                        <Avatar size={100} icon={<UserOutlined />} />
                        {userData?.firstName} {userData?.lastName}
                      </>
                    }
                    {/* {isVideoOn ? (
                    <video width="100%" height="100%" id="camera-video"></video>
                    ) : (
                      <>
                        <Avatar size={100} icon={<UserOutlined />} />
                        {userData?.firstName} {userData?.lastName}
                      </>
                    )} */}
                    <div className="video-icon">
                      {/* <Button className='iconButton' onClick={() => togglePublishAudio(!isAudioPubed)}><img src={mic} alt="Error" width={25} /></Button>
                      <Button className='iconButton' onClick={() => togglePublishVideo(!isVideoOn)} ><img src={videoplayer} alt="Error" width={25} /></Button> */}
                      <Button className='iconButton' icon={isAudioPubed ? <AudioOutlined /> : <AudioMutedOutlined />} onClick={() => togglePublishAudio(!isAudioPubed)} />
                      <Button className='iconButton' icon={isVideoOn ? <VideoCameraOutlined /> : <BsCameraVideoOff />} onClick={() => togglePublishVideo(!isVideoOn)} />
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
                      <Button className='leaveButton' danger onClick={leaveChannel}>Leave Meeting</Button>
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
                {/* <Card title="chats" className="participants-container" style={{ marginTop: '30px' }}>
                  <ChatUI />
                </Card> */}
              </div>
            </div>
            </Sider>
          )}
          {showChats && (
            <Sider width={350} theme='light'> <div style={{ paddingTop: '30px' }}>
              <div className='userContainer'>
                {/* <ParticipantsPanel /> */}
                <Card title="chats" className="participants-container" style={{ marginTop: '30px' }}>
                  <ChatUI />
                </Card>
              </div>
            </div>
            </Sider>
          )}
        </Layout>








        {/* 
        <video id="remote-video" hidden={isVideoSubed ? false : true}></video>
        <br />
        <br />
        <br />

        <div className="left-side">
          <video id="camera-video" hidden={isVideoOn ? false : true}></video>
          <div className="buttons">
            <button
              onClick={() => turnOnCamera()}
              className={isVideoOn ? "button-on" : ""}
            >
              Turn {isVideoOn ? "off" : "on"} camera
            </button>
            <br />
            <button
              onClick={publishVideo}
              className={isVideoPubed ? "button-on" : ""}
            >
              Publish Video
            </button>
            <br />
            <button
              onClick={() => turnOnMicrophone()}
              className={isAudioOn ? "button-on" : ""}
            >
              Turn {isAudioOn ? "off" : "on"} Microphone
            </button>
            <br />
            <button
              onClick={publishAudio}
              className={isAudioPubed ? "button-on" : ""}
            >
              Publish Audio
            </button>
            <br />
            <button
              onClick={() => screenShare()}
              className={isAudioOn ? "button-on" : ""}
            >
              Screen {isAudioOn ? "off" : "on"} Share
            </button>
            <br />
            <button onClick={leaveChannel}>Leave Channel</button>
          </div>
        </div>
        <div className="right-side">
          <video id="camera-video" hidden={isVideoOn ? false : true}></video>
          <video id="screen-video"></video>
          {isJoined && !isVideoSubed ? (
            <div className="waiting">
              You can shared channel {meetingData.roomId} to others.....
            </div>
          ) : null}
        </div> */}


      </div>
    </>
  );
}

export default VideoPlayer;