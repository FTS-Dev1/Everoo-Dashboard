
import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select, Checkbox, Col, Row } from 'antd'
import { LocalDiningOutlined } from '@mui/icons-material'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { BsArrowLeftShort } from "react-icons/bs";

// API :
import { CreatCityAPI, GetAllServicesDataAPI, UpdateCityAPI } from 'API/city'
// Redux :
import { useSelector } from 'react-redux'
// Helper :
import { toast } from 'react-toastify'





const AddCity = ({ selectedCity, closePage }) => {

    const [allServicesData, setAllServicesData] = useState(null)
    const [allServicesList, setAllServicesList] = useState([])

    const [cityName, setCityName] = useState("")
    const [selectedServiceData, setSelectedServiceData] = useState({})

    const [loading, setLoading] = useState(false);


    const onChange = (service, checkedValues) => {
        setSelectedServiceData({
            ...selectedServiceData,
            [service]: checkedValues
        })
    };


    const SavingCity = async () => {
        setLoading(true);
        let res;
        if (selectedCity) {
            res = await UpdateCityAPI(selectedCity?._id, { name: cityName, services: selectedServiceData });
        } else {
            res = await CreatCityAPI({ name: cityName, services: selectedServiceData });
        }
        if (res.error != null) {
            if (res.error?.err?.code == 11000) {
                toast.error("Doppelter Eintrag")
            } else {
                toast.error("etwas ist schief gelaufen")
            }
        } else {
            toast.success("Operation erfolgreich");
            closePage();
        }
        setLoading(false);
    }



    const gettingAllServices = async () => {
        let res = await GetAllServicesDataAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
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
                    <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">{selectedCity ? "Bearbeiten" : "Hinzufügen"} Ereignis </div></div>
                </div>
                <div className="ManageAccessMain">

                    <div className="inputMain">
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="lableName">Die Stadt</div>
                                <div className="inputselect">
                                    <div className="selecticon"><Flag className='iconInfo' /></div>
                                    <input
                                        placeholder='Name der Stadt'
                                        value={cityName}
                                        className='selector'
                                        onChange={(event) => setCityName(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="servicesList">

                                    {
                                        allServicesList.map((service, index) => {
                                            return (
                                                <>
                                                    <div className="lableName">Dienst auswählen</div>
                                                    <div className="service">
                                                        <div className="inputselect">
                                                            <div className="selecticon"><Flag className='iconInfo' /></div>
                                                            <input
                                                                placeholder='city name'
                                                                value={service}
                                                                className='selector'
                                                            // onChange={(event) => setCityName(event.target.value)}
                                                            />
                                                        </div>
                                                        {/* <div className="title">{index + 1} :- {service}</div> */}
                                                        <div className="list">
                                                            <Checkbox.Group
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                onChange={(newValues) => onChange(service, newValues)}
                                                                value={selectedServiceData[service]}
                                                            >
                                                                <Row>
                                                                    {allServicesData[service].map((option) => (
                                                                        <Col span={8} key={option}>
                                                                            <Checkbox value={option?._id}>{option?.title}</Checkbox>
                                                                        </Col>
                                                                    ))}
                                                                </Row>
                                                            </Checkbox.Group>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>

                        <Button className='yellowGraBtn'
                            loading={loading}
                            onClick={SavingCity}
                        >{selectedCity ? "Aktualisierung" : "speichern"}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCity;