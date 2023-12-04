import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI | AQNT-D :
import { Button } from "antd";

// Components :
import PreLoader from "Components/PreLoader/PreLoader";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

// AGORA :
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

// API :
import { GetSpecificMeetingAPI } from "API/meeting";
// Helper :
import { toast } from "react-toastify";

// CSS :
import "./VideoCalling.scss";





const VideoCall = ({ }) => {
  let Navigate = useNavigate();
  let Location = useLocation();
  let meetingId = Location.state?.meetingId || null;

  const [meetingData, setMeetingData] = useState(null)


  const goToMeetingPage = () => {
    Navigate("/dashboard/meetings")
  }

  const gettingMeetingData = async () => {
    let res = await GetSpecificMeetingAPI(meetingId);
    if (res.error != null) {
      toast.error(res.error)
      setMeetingData(false)
    } else {
      setMeetingData(res.data?.result)
    }
  }
  useEffect(() => {
    if (meetingId) {
      gettingMeetingData()
    }
  }, []);

  return (
    <>
      <div className="videoContainer">
        {
          !meetingId || meetingData == false ?
            <>
              <div className="invalid">
                Invalid Meeting Link
                <Button className='dashboardBtn' style={{ width: "150px" }} onClick={goToMeetingPage}> Go to Meetings </Button>
              </div>
            </>
            : meetingData == null ?
              <>
                <PreLoader text="Starting Meeting" />
              </>
              :
              <>
                <VideoPlayer meetingData={meetingData} />
              </>
        }
      </div>
    </>
  );
}

export default VideoCall;
