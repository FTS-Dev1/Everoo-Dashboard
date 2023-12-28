import React, { useState } from "react";

// MUI | ANT-D :
import { Button, Input, Select, Upload, Radio, DatePicker } from "antd";

// Assets | ICONS :
import { BsDownload } from "react-icons/bs";
import { Calendar, Chart, MedalStar, VideoTime } from "iconsax-react";
import { LocalDiningOutlined } from "@mui/icons-material";
import educationHistory from "Assets/Svgs/educationHistory.svg";
import Degree from "Assets/Svgs/Degree.svg";
import Institude from "Assets/Svgs/Institude.svg";

// Components :
import Table from "../../table/Table";

// APIs :
import { AddEducationAPI } from "API/user";
// Redux :
import { useDispatch } from "react-redux";
import { refreshAPIsActions } from "Redux/Slice/refreshAPIs";
// Helpers :
import { toast } from "react-toastify";
import dayjs from 'dayjs';

// CSS :
import "./EducationHistory.scss";



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

const EducationHistory = ({selectedUser}) => {
  let Dispatch = useDispatch();


  const [formData, setFormData] = useState({
    educationType: "",
    degreeType: null,
    degreeTitle: "",
    instituteName: "",
    specialty: "",
    startDate: null,
    endDate: null,
    duration: null,
    progress: "",
    education: [],
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUploadChange = (info) => {
    setFile(info?.file?.originFileObj || null);
  };


  const educationFunc = async () => {
    setLoading(true);
    let fData = new FormData();
    Object.keys(formData).map((key) => {
      if (formData[key]) {
        fData.append(key, formData[key]);
      }
    });
    if (file) {
      fData.append("file", file);
    }
    let res = await AddEducationAPI(selectedUser?._id, fData);
    if (res?.error != null) {
      toast.error("etwas ist schief gelaufen");
    } else {
      toast.success("Operation erfolgreich");
      setFormData({
        educationType: "",
        degreeType: "",
        degreeTitle: "",
        instituteName: "",
        specialty: "",
        startDate: null,
        endDate: null,
        duration: null,
        progress: "",
        education: [],
      })
      setFile(null)

      Dispatch(refreshAPIsActions.setRefreshUserData())
    }

    setLoading(false);
  };
  const columns = [
    {
      title: "Education Type",
      dataIndex: "educationType",
      key: "educationType",
      width: "10%",
    },
    {
      title: "Degree Type",
      dataIndex: "degreeType",
      key: "degreeType",
      width: "15%",
    },
    {
      title: "Degree Title",
      dataIndex: "degreeTitle",
      key: "address",
      width: "15%",
    },
    {
      title: "Institute Name",
      dataIndex: "instituteName",
      key: "instituteName",
      width: "15%",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
      width: "15%",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: "15%",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: "20%",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "20%",
    },
    {
      title: "Still In Progress",
      dataIndex: "progress",
      key: "progress",
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
      <div className="EducationHistoryMainConatiner">
        <div className="EducationHistoryHeading">
          <div className="eduDiv">
            <img src={educationHistory} alt="educationHistory" />
            <h1 className="heading">EDUCATION HISTORY</h1>
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
                <h1 className="TypeHeading">Education Type</h1>
                <div>
                  <Radio.Group
                    name="educationType"
                    onChange={handleFormData}
                    value={formData.educationType}
                  >
                    <Radio value="Islamic">Islamic</Radio>
                    <Radio value="other">Other</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Degree Type</div>
              <div>


                <img className="degreeImage2" src={Degree} alt="Degree" />
                <Select
                  placeholder="Degree Type"
                  className="registerSelector"
                  value={formData.degreeType}
                  onChange={(value) => handleSelectChange("degreeType", value)}
                  options={[
                    { value: "diploma", label: "Diploma" },
                    { value: "bachelors", label: "Bachelors" },
                    { value: "others", label: "Others" },
                  ]}
                />
              </div>
            </div>
            <div className="field2 field">
              <div className="lableName">Degree Title</div>
              <img className="degreeImage2" src={Degree} alt="Degree" />
              <Input
                size="large"
                className="eduInput"
                type="text"
                placeholder="Degree Title"
                name="degreeTitle"
                value={formData?.degreeTitle}
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className="Inputfield">
            <div className="field1 field">
              <div className="lableName">Institude Name</div>
              <img className="degreeImage2" src={Institude} alt="Degree" />
              <Input
                size="large"
                className="InsInput"
                type="text"
                placeholder="Institute Name"
                name="instituteName"
                value={formData?.instituteName}
                onChange={handleFormData}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">Speciality</div>
              <Input
                prefix={<MedalStar />}
                size="large"
                className="eduInput"
                type="text"
                placeholder="Specialty"
                value={formData?.specialty}
                name="specialty"
                onChange={handleFormData}
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
                onChange={onStartChange}
                format={"DD-MM-YYYY"}
                value={formData?.startDate ? dayjs(formData?.startDate) : null}
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
                type="text"
                placeholder="Duration in Years"
                name="duration"
                value={formData?.duration}
                onChange={handleFormData}
              />
            </div>
            <div className="field2 field">
              <div className="lableName">Still in Progress</div>
              <div className="progressInput">
                {<Chart />}
                <h1 className="progressHeading ">Still In Progress</h1>
                <div>
                  <Radio.Group
                    name="progress"
                    onChange={handleFormData}
                    defaultValue={formData.progress}
                    className="progressRadio"
                    value={formData?.progress}
                  >
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>

          <div className="Inputfield">
            <div className="field2 field">

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
                  ) }
                </Upload>
              </div>
            </div>

            <div className="saveButton">
              <Button disabled className="yellowGraBtn btn" loading={loading} onClick={educationFunc}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="table">
        <Table columns={columns} rows={selectedUser?.education} />;
      </div>
    </>
  );
};

export default EducationHistory;
