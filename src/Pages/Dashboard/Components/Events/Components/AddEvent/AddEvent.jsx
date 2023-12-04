import React, { useState } from "react";

// ANT-D | MUI :
import { Button, Input ,Upload} from "antd";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// ICONS | Assets :
import { BsArrowLeftShort } from "react-icons/bs";

// APIs :
import { CreatEventAPI } from "API/event";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./AddEvent.scss";





const AddEvents = ({ closePage, setCurrentPage }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  })
  const [loading, setLoading] = useState(false)


  const enteringFormData = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCreateEvent = async () => {
    setLoading(true)
    let res = await CreatEventAPI(formData)
    if (res.error != null) {
      toast.error(res.error)
    } else {
      toast.success(res.data?.message)
      closePage()
    }
    setLoading(false)
  }

  return (
    <>
      <div className="AddEventMain">
        <div className="flexLineSpace">
          <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">Add Event</div></div>
        </div>
        <div className="AddBodyMain">
          <div className="Events">
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // beforeUpload={beforeUpload}
              // onChange={handleUploadChange}
            >


            </Upload>
            <div className="inputFields">
              <div className="lableName">Event Title</div>
              <Input
                size="large"
                className="eventInput"
                type="text"
                placeholder="Event Title"
                value={formData?.title}
                name="title"
                onChange={enteringFormData}
              />

              <div className="lableName">Event Description</div>
              <Input.TextArea
                rows={6}
                size="large"
                className="eventDescription"
                type="text"
                placeholder="Event Deescription"
                value={formData?.description}
                name="description"
                onChange={enteringFormData}
              />
              <div className="BtnReadMore">
                <Button className="readMoreBtn" loading={loading} onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvents;
