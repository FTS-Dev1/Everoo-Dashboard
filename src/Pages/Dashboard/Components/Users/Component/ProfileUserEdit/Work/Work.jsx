import React, { useState } from "react";

// MUI | ANT-D :
import { Button, Input, Upload, Radio, DatePicker } from "antd";

// Assets | ICONS :
import { BsDownload } from "react-icons/bs";
import { Calendar, Chart, VideoTime } from "iconsax-react";
import { LocalDiningOutlined } from "@mui/icons-material";
import educationHistory from "Assets/Svgs/educationHistory.svg";
import quranTeach from "Assets/Svgs/quranTeach.svg";
import otherTeach from "Assets/Svgs/otherTeach.svg";
import organization from "Assets/Svgs/organization.svg";
import position from "Assets/Svgs/position.svg";

// Components :
import Table from "../../table/Table";

// APIs :
import { AddWorkAPI } from "API/user";
// Redux :
import { useDispatch } from 'react-redux'
import { refreshAPIsActions } from "Redux/Slice/refreshAPIs";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Work.scss";
import dayjs from "dayjs";





const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    return console.log("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return console.log("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const WorkExperience = ({ selectedUser }) => {
  let Dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    experienceType: "",
    quranExperience: "",
    otherExperience: "",
    organizationTitle: "",
    positionTitle: "",
    startDate: "",
    endDate: "",
    duration: "",
    progress: "",
  });


  const onStartChange = (date, dateString) => {
    handleData("startDate", dateString);
  };
  const onEndChange = (date, dateString) => {
    handleData("endDate", dateString);
  };

  const handleData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormData = (event) => {
    let { name, value } = event.target;
    handleData(name, value);
  };


  const workFunc = async () => {
    setLoading(true)
    let fData = new FormData();
    Object.keys(formData).map((key) => {
      if (formData[key]) {
        fData.append(key, formData[key])
      }
    })
    if (file) {
      fData.append('file', file)
    }
    let res = await AddWorkAPI(selectedUser?._id, fData)
    if (res?.error != null) {
      toast.error("etwas ist schief gelaufen")
    } else {
      toast.success("Operation erfolgreich")
      setFormData({
        experienceType: "",
        quranExperience: "",
        otherExperience: "",
        organizationTitle: "",
        positionTitle: "",
        startDate: "",
        endDate: "",
        duration: "",
        progress: "",
      })
      setFile(null)

      Dispatch(refreshAPIsActions.setRefreshUserData())
    }

    setLoading(false)
  };

  const handleUploadChange = (info) => {
    setFile(info?.file?.originFileObj || null);
  };


  const columns = [
    {
      title: 'Experience Type',
      dataIndex: 'experienceType',
      key: 'experienceType',
    },
    {
      title: 'Organization Title',
      dataIndex: 'organizationTitle',
      key: 'organizationTitle',
    },
    {
      title: 'Position Title',
      dataIndex: 'positionTitle',
      key: 'positionTitle',
    },

    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Still In Progress',
      dataIndex: 'progress',
      key: 'progress',
    },

  ];

  const shortenHeading = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };


  return (
    <>
      <div className="WorkMainConatiner">
        <div className="EducationHistoryHeading">
          <div className="eduDiv">
            <img src={educationHistory} alt="educationHistory" />
            <h1 className="heading">Work Experience</h1>
          </div>
          {/* <Button disabled
            className="yellowGraBtn AddBtn"
          >
            Add
          </Button> */}
        </div>
        <div className="InputFields">
          <div className="Inputfield">
            <div className="field1 field">
              <div className="educationField eduInput">
                <h1 className="TypeHeading">Experience Type</h1>
                <div>
                  <Radio.Group name="experienceType" value={formData?.experienceType} onChange={handleFormData} defaultValue={formData.experienceType}>
                    <Radio value="Quran Teaching">Quran Teaching</Radio>
                    <Radio value="Other Teaching">Other Teaching</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Quran Teaching Experience</div>
              <img className="degreeImage2" src={quranTeach} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Quran Teaching Experience"
                name="quranExperience"
                value={formData?.quranExperience}
                onChange={handleFormData}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">Other Teaching Experience</div>
              <img className="degreeImage2" src={otherTeach} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Other Teaching Experience"
                name="otherExperience"
                onChange={handleFormData}
                value={formData?.otherExperience}
              />
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Organization Title</div>
              <img className="degreeImage2" src={organization} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Organization Title"
                name="organizationTitle"
                onChange={handleFormData}
                value={formData?.organizationTitle}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">Position Title</div>
              <img className="degreeImage2" src={position} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Position Title"
                name="positionTitle"
                onChange={handleFormData}
                value={formData?.positionTitle}
              />
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Start Date</div>
              <Calendar className="degreeImage2" />
              <DatePicker
                size="large"
                className="eduInput"
                type="date"
                placeholder="Select Start Date"
                name="startDate"
                value={formData?.startDate ? dayjs(formData?.startDate) : null}
                onChange={onStartChange}
                format={"DD-MM-YYYY"}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">End Date</div>
              <Calendar className="degreeImage2" />
              <DatePicker
                size="large"
                className="eduInput"
                type="date"
                placeholder="Select End Date"
                name="endDate"
                value={formData?.endDate ? dayjs(formData?.endDate) : null}
                onChange={onEndChange}
                format={"DD-MM-YYYY"}
              />
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Duration in Year</div>
              <VideoTime className="degreeImage2" />
              <Input
                size="large"
                className="eduInput"
                placeholder="Duration in Year"
                name="duration"
                onChange={handleFormData}
                type="text"
                value={formData?.duration}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">Still In Progress</div>
              <div className="progressInput">
                {<Chart />}
                <h1 className="progressHeading ">Still In Progress</h1>
                <div>
                  <Radio.Group
                    name="progress"
                    onChange={handleFormData}
                    value={formData?.progress}
                    className="progressRadio"
                  >
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="Inputfield">
            <div className="attachment uploadBtn">
              <div className="icon">
                <BsDownload style={{ color: "black" }} /> {file ? shortenHeading(file?.name, 50) : "Attach File"}
              </div>
              <Upload
                name="image"
                className="upload"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                {file && (
                  <div className="imgBox1">
                    Browse
                  </div>
                )}
              </Upload>
            </div>
          </div>

          <div className="saveButton">
            <Button disabled className="yellowGraBtn btn" loading={loading} onClick={workFunc}>Save</Button>
          </div>

        </div>
      </div>
      <div className="table">
        <Table columns={columns} rows={selectedUser?.work} />
      </div>
    </>
  );
};

export default WorkExperience;
