import React, { useState } from 'react'

import { Button, Input } from 'antd';

// CSS :
import "./JoinMeeting.scss";
import { JoinMeetingAPI } from 'API/meeting';
import { toast } from 'react-toastify';





const JoinMeeting = () => {

    const [meetingId, setMeetingId] = useState("")
    const [loading, setloading] = useState(false)

    const enteringData = (event) => {
        setMeetingId(event.target.value)
    }

    const handelJoin = async () => {
        setloading(true)
        const res = await JoinMeetingAPI(meetingId)
        if (res.error != null) {
            toast.error(res.error)
        } else {
            window.open(res.data.result.url, "_blanck")
        }
        setloading(false)
    }

    return (
        <>
            <div className="joinMeetingContainer">
                <div className="box">
                    <div className="heading">Join Meeting</div>
                    <div className="form">
                        <div className="title"> Meeting ID  </div>
                        <Input className='' name='meetingId' value={meetingId} onChange={enteringData} placeholder='Enter Your Meeting ID' />
                        <Button className='yellowGraBtn btn' loading={loading} onClick={handelJoin}> Join </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinMeeting