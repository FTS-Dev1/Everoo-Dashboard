import React from 'react'

import { Button, Input } from 'antd';

// CSS :
import "./CreateMeeting.scss";
import { useState } from 'react';
import { CreateMeetingAPI } from 'API/meeting';
import { toast } from "react-toastify"
import { BiCopy } from "react-icons/bi"
import { useSelector } from 'react-redux';




const CreateMeeting = ({ RoutePermissions }) => {

    const UserData = useSelector(state => state?.userData)

    const [meetingData, setMeetingData] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleCreateLink = async () => {
        setLoading(true)
        const res = await CreateMeetingAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setMeetingData(res.data.result)
        }
        setLoading(false)
    }

    const handelOpenMeeting = () => {
        window.open(meetingData?.adminLink, "_blank")
    }
    const copyLink = () => {

        var textField = document.createElement('textarea')
        textField.innerText = meetingData?.shortLink
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success("Copied")

    }

    return (
        <>
            <div className="createMeetingContainer">
                <div className="box">
                    <div className="heading">Start Meeting</div>

                    {
                        meetingData ?
                            <>
                                <div className="form">
                                    <div className="title"> Meeting ID  </div>
                                    <Input className='linkInput' name='meetingId' value={meetingData?.shortLink} placeholder='Your Meeting ID' suffix={<div style={{ cursor: "pointer", zIndex: "999", fontSize: "1.2rem", height: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }} onClick={copyLink}> <BiCopy color="black" /> </div>} />
                                    <Button className='yellowGraBtn btn' onClick={handelOpenMeeting}> Open Meeting </Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="details">Click <b> Start Meetings </b> on the dialog shown by your browser. <br /> If you don’t see a dialog, click <b> Launch Meeting below </b> </div>
                                {
                                    (UserData?.isSuperAdmin ||RoutePermissions?.includes("create")) &&
                                    <Button className='yellowGraBtn btn' loading={loading} onClick={handleCreateLink} > Create Meeting Link </Button>
                                }
                            </>
                    }

                </div>
            </div>
        </>
    )
}

export default CreateMeeting