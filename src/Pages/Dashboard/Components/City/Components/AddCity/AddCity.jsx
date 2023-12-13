
import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select, Checkbox, Col, Row } from 'antd'
import { LocalDiningOutlined } from '@mui/icons-material'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { BsArrowLeftShort } from "react-icons/bs";

// API :
import { CreatCityAPI, GetAllServicesDataAPI } from 'API/city'
// Redux :
import { useSelector } from 'react-redux'
// Helper :
import { toast } from 'react-toastify'





const AddCity = ({ selectedCity, closePage }) => {

    const [allServicesData, setAllServicesData] = useState(null)
    const [allServicesList, setAllServicesList] = useState([])

    const [cityName, setCityName] = useState("")
    const [selectedService, setSelectedService] = useState(null)
    const [selectedServiceData, setSelectedServiceData] = useState({})

    const [checkedValues, setCheckedValues] = useState([]);
    const [loading, setLoading] = useState(false);


    const onChange = (checkedValues) => {
        setCheckedValues(checkedValues);
        setSelectedServiceData({
            ...selectedServiceData,
            [selectedService]: checkedValues
        })
    };
    const handleSelectChange = (event) => {
        setSelectedService(event)
    }


    const SavingCity = async () => {
        setLoading(true);
        let res = await CreatCityAPI({ name: cityName, services: selectedServiceData });
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
        }
        setLoading(false);
    }



    const gettingAllServices = async () => {
        let res = await GetAllServicesDataAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setAllServicesData(res.data?.result || null)
            if (res?.data?.result) {
                let list = Object.keys(res?.data?.result)
                setAllServicesList(list)
            }
        }
    }
    useEffect(() => {
        gettingAllServices()
    }, [])

    useEffect(() => {
        if (selectedService) {
            let getCheckedValues = selectedServiceData[selectedService]
            if (getCheckedValues && getCheckedValues.length >= 1) {
                setCheckedValues(getCheckedValues)
            }
        }
    }, [selectedService])

    useEffect(() => {
        if (selectedCity) {
            setSelectedServiceData({
                Ausstattung: selectedCity?.Ausstattung,
                Beverage: selectedCity?.Beverage,
                Catering: selectedCity?.Catering,
                Dekoration: selectedCity?.Dekoration,
                Eventmodule: selectedCity?.Eventmodule,
                Hotelmanagement: selectedCity?.Hotelmanagement,
                Location: selectedCity?.Location,
                Prasente: selectedCity?.Prasente,
                Shuttle: selectedCity?.Shuttle,
                Staff: selectedCity?.Staff,
                Veranstaltungstechnik: selectedCity?.Veranstaltungstechnik,
            })
            setCityName(selectedCity?.name)
        } else {
            setSelectedServiceData({
                Ausstattung: [],
                Beverage: [],
                Catering: [],
                Dekoration: [],
                Eventmodule: [],
                Hotelmanagement: [],
                Location: [],
                Prasente: [],
                Shuttle: [],
                Staff: [],
                Veranstaltungstechnik: [],
            })
            setCityName("")
        }
    }, [selectedCity])

    return (
        <>
            <div className="AddEventMain">
                <div className="flexLineSpace">
                    <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">{selectedCity ? "Edit" : "ADD"} Event</div></div>
                </div>
                <div className="ManageAccessMain">

                    <div className="inputMain">
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="lableName">City</div>
                                <div className="inputselect">
                                    <div className="selecticon"><Flag className='iconInfo' /></div>
                                    <input
                                        placeholder='city name'
                                        value={cityName}
                                        className='selector'
                                        onChange={(event) => setCityName(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="lableName">Select Service</div>
                                <div className="inputselect">
                                    <div className="selecticon"><Flag className='iconInfo' /></div>
                                    <Select
                                        placeholder='Select Service'
                                        bordered={false}
                                        value={selectedService}
                                        className='selector'
                                        onChange={handleSelectChange}
                                        options={allServicesList.map(service => ({ value: service, label: service }))}
                                    />
                                </div>
                            </div>
                        </div>


                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChange}
                            value={checkedValues}
                        >
                            <Row>
                                {selectedService && allServicesData[selectedService].map((option) => (
                                    <Col span={8} key={option}>
                                        <Checkbox value={option?._id}>{option?.title}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>

                        <Button className='yellowGraBtn'
                            loading={loading}
                            onClick={SavingCity}
                        >{selectedCity ? "Update" : "Save"}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCity;