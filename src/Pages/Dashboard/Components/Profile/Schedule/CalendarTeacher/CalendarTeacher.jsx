import React, { useState, useMemo, useCallback, useEffect } from 'react'


// Helpers
import { Button, Modal } from 'antd';

// Other components
import ConfirmationModel from 'Components/ConfirmationModel/ConfirmationModel';

// Calendar Components
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from 'react-toastify';
import { RiInformationLine } from 'react-icons/ri';

// import Style
import './CalendarTeacher.scss'


// API's Component
import { CreatScheduleAPI, GetTeacherScheduleAPI } from 'API/Schedule';



const CalendarTeacher = () => {
    const localizer = globalizeLocalizer(globalize)

    // Calendar Functions
    // States
    const [loading, setLoading] = useState(false)
    const [myEvents, setEvents] = useState([])
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        Slot: null,
        loading: false
    })


    // Model functions for create appointments
    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            let duration = moment(end).diff(moment(start), 'minutes');
            // Allow selection only if the duration is exactly one hour (60 minutes)
            if (duration <= 60) {
                let startDate = new Date(start).getTime()
                let endDate = new Date(end).getTime()
                let result = []
                myEvents?.filter((eventD) => {
                    let eventStartDate = new Date(eventD?.start).getTime()
                    let eventEndDate = new Date(eventD?.end).getTime()
                    if (eventStartDate <= startDate && eventEndDate >= endDate) {
                        return result.push(eventD)
                    }
                    else if (eventStartDate === startDate) {
                        return result.push(eventD)
                    }
                    else if (eventEndDate === endDate) {
                        return result.push(eventD)
                    }
                })
                if (result?.length >= 1) {
                    handleDeleteSlotConfirmation(result)
                }
                else {
                    const title = "Available"
                    if (title) {
                        setEvents((prev) => [...prev, { start, end, title }]
                        )
                    }
                }
            } else {
                toast.warning("You just select One Hour")
            }
        },
        [myEvents]
    )

    // onclick for user Schedule Availibity function
    const setSchedualeAvail = async () => {
        setLoading(true)
        let res = await CreatScheduleAPI(myEvents)
        if (res?.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
            setLoading(false)
        }
    }

    const handleSelectEvent = useCallback((event) => {
        if (event?.title == "Booked") {
            return toast.warning("You can't delete this slot")
        } else {
            handleDeleteSlotConfirmation(event)
        }
    }
        , [])


    const { defaultDate, scrollToTime, views, vieww } = useMemo(
        () => ({
            defaultDate: new Date(),
            scrollToTime: new Date(),
            views: ["week"],
            vieww: ["day"]
        }),
        []
    )

    const handleDeleteSlotConfirmation = (Slot) => {
        setDeleteConfirmation({
            open: true,
            Slot: Slot[0] ? Slot[0] : Slot,
            loading: false
        })
    }
    const handleDeleteSlot = async (Slot) => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })

        toast.success("Slot Deleted Successfully")
        if (deleteConfirmation) {
            let selectDateTime = new Date(deleteConfirmation?.Slot?.start).getTime()
            myEvents?.splice(myEvents?.findIndex(d => new Date(d?.start).getTime() == selectDateTime), 1)
        }
        setDeleteConfirmation({
            open: false,
            Slot: null,
            loading: false
        })
    }
    const handleNotDeleteSlot = () => {
        setDeleteConfirmation({
            open: false,
            Slot: null,
            loading: false
        })
    }


    let minTime = new Date()
    minTime?.setDate(new Date()?.getDay() - 1)
    let maxTime = new Date()
    maxTime.setFullYear(new Date()?.getFullYear() + 1)


    const gettingSchedule = async () => {
        setLoading(true)
        const res = await GetTeacherScheduleAPI()
        if (res?.error != null) {
            toast?.error(res?.error)
        } else {
            let availData = res?.data?.result?.Availibility?.map((data) => ({
                ...data,
                start: new Date(data?.start),
                end: new Date(data?.end)
            }))

            setEvents(availData || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        gettingSchedule()
    }, [])



    return (
        <>
            <div className="TeacherCalendarMain">
                <div className="calendarweek">
                    <Calendar
                        selectable
                        range={false}
                        localizer={localizer}
                        events={myEvents}
                        onSelectEvent={handleSelectEvent}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 700 }}
                        defaultDate={defaultDate}
                        defaultView={views.WEEK}
                        onSelectSlot={handleSelectSlot}
                        onSelecting={slot => false}
                        scrollToTime={scrollToTime}
                        views={views}
                        view='week'
                        dayLayoutAlgorithm="no-overlap"
                        step={60}
                    />
                </div>
                <div className="calendarday">
                    <Calendar
                        selectable
                        range={false}
                        localizer={localizer}
                        events={myEvents}
                        onSelectEvent={handleSelectEvent}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 700 }}
                        defaultDate={defaultDate}
                        defaultView={vieww.Day}
                        onSelectSlot={handleSelectSlot}
                        onSelecting={slot => false}
                        scrollToTime={scrollToTime}
                        views={vieww}
                        view='day'
                        dayLayoutAlgorithm="no-overlap"
                        step={60}
                    />
                </div>
                <Button className='yellowGraBtn' onClick={setSchedualeAvail}>Save Availability</Button>
            </div>
            <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteSlot} onCancel={handleNotDeleteSlot} confirmLoading={deleteConfirmation.loading} test={deleteConfirmation.Slot}>
                <div className="deleteModel">
                    <div className="titleBox">
                        {/* <RiInformationLine className='icon' />  */}
                        <div className="title"> Are you sure you want to delete this Slot? <br />
                            From : <span>{moment(deleteConfirmation?.Slot?.start).format("DD-MM-YYYY hh:mm A")}</span> <br />
                            To : <span>{moment(deleteConfirmation?.Slot?.end).format("DD-MM-YYYY hh:mm A")}</span>
                        </div>
                    </div>
                </div>
            </ConfirmationModel>
        </>
    )
}

export default CalendarTeacher