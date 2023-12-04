import React, { useState } from "react";

// MUI | ANT-D :
import { Button, Input, Upload, Radio, DatePicker } from "antd";

// Assets | ICONS :
import { BsDownload } from "react-icons/bs";
import { Calendar, Chart, VideoTime } from "iconsax-react";
import { LocalDiningOutlined } from "@mui/icons-material";
import educationHistory from "../../../../../Assets/Svgs/educationHistory.svg";
import quranTeach from "../../../../../Assets/Svgs/quranTeach.svg";
import otherTeach from "../../../../../Assets/Svgs/otherTeach.svg";
import organization from "../../../../../Assets/Svgs/organization.svg";
import position from "../../../../../Assets/Svgs/position.svg";

// Components :
import Table from "../../Users/Component/table/Table";

// APIs :
import { AddWorkAPI } from "API/user";
// Redux :
import { useDispatch, useSelector } from 'react-redux'
import { refreshAPIsActions } from "Redux/Slice/refreshAPIs";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Work.scss";
import dayjs from "dayjs";






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

const WorkExperience = () => {
  let Dispatch = useDispatch();

  const UserData = useSelector((state) => state.userData);

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

  const [formError, setFormError] = useState({
    experienceType: null,
    quranExperience: null,
    otherExperience: null,
    organizationTitle: null,
    positionTitle: null,
    startDate: null,
    endDate: null,
    duration: null,
    progress: null,
  })


  const onStartChange = (date, dateString) => {
    handleData("startDate", dateString);
  };
  const onEndChange = (date, dateString) => {
    handleData("endDate", dateString);
  };
  const onTimeChange = (time, timeString) => {
    handleData("duration", timeString);
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
    if (
      !formData.quranExperience ||
      !formData.otherExperience ||
      !formData.organizationTitle ||
      !formData.positionTitle ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setFormError({
        quranExperience: formData.quranExperience ? null : "quranExperience is required.",
        otherExperience: formData.otherExperience ? null : "otherExperience is required.",
        organizationTitle: formData.organizationTitle ? null : "organizationTitle is required.",
        positionTitle: formData.positionTitle ? null : "positionTitle is required.",
        startDate: formData.startDate ? null : "startDate is required.",
        endDate: formData.endDate ? null : "endDate is required.",
      })
      toast?.error("Please fill in all the required fields.");
      setLoading(false)
      return;
    }
    let fData = new FormData();
    Object.keys(formData).map((key) => {
      if (formData[key]) {
        fData.append(key, formData[key])
      }
    })
    if (file) {
      fData.append('file', file)
    }
    let res = await AddWorkAPI(UserData?._id, fData)
    if (res?.error != null) {
      toast.error(res.error)
    } else {
      toast.success(res?.data?.message)
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

  const uploadButton = (
    <div>
      {loading && <LocalDiningOutlined />}
      <div
        style={{
          marginTop: 0,
        }}
      >
        Browse
      </div>
    </div>
  );

  const columns = [
    {
      title: 'Experience Type',
      dataIndex: 'experienceType',
      key: 'experienceType',
      ellipsis: true,
    },
    {
      title: 'Organization Title',
      dataIndex: 'organizationTitle',
      key: 'organizationTitle',
      ellipsis: true,
    },
    {
      title: 'Position Title',
      dataIndex: 'positionTitle',
      key: 'positionTitle',
      ellipsis: true,
    },

    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      ellipsis: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      ellipsis: true,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      ellipsis: true,
    },
    {
      title: 'Still In Progress',
      dataIndex: 'progress',
      key: 'progress',
      ellipsis: true,
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
          {/* <Button
            className="yellowGraBtn AddBtn"
          >
            Add
          </Button> */}
        </div>
        <div className="InputFields">
          <div className="Inputfield">
            <div className="field1 field experienceTypeField">
            <div className="lableName experienceTypeLable">Experience Type</div>
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
              {formError.quranExperience && (
                <p className=" errorMessage">
                  {formError.quranExperience}
                </p>
              )}
            </div>
            <div className="field2 field">
              <div className="lableName">Other Teaching Experience</div>
              <img className="degreeImage" src={otherTeach} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Other Teaching Experience"
                name="otherExperience"
                onChange={handleFormData}
                value={formData?.otherExperience}
              />
              {formError.otherExperience && (
                <p className=" errorMessage">
                  {formError.otherExperience}
                </p>
              )}
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
              {formError.organizationTitle && (
                <p className=" errorMessage">
                  {formError.organizationTitle}
                </p>
              )}
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
              {formError.positionTitle && (
                <p className=" errorMessage">
                  {formError.positionTitle}
                </p>
              )}
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
              {formError.startDate && (
                <p className=" errorMessage">
                  {formError.startDate}
                </p>
              )}
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
              {formError.endDate && (
                <p className=" errorMessage">
                  {formError.endDate}
                </p>
              )}
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
                {file ? (
                  <div className="imgBox1">
                    Browse
                  </div>
                ) :
                  <div className="imgBox1">
                    Browse
                  </div>
                }
              </Upload>
            </div>
          </div>

          <div className="saveButton">
            <Button className="yellowGraBtn btn" loading={loading} onClick={workFunc}>Save</Button>
          </div>

        </div>
      </div>
      <div className="table">
        <Table columns={columns} rows={UserData?.work} />
      </div>
    </>
  );
};

export default WorkExperience;
