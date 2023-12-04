
import React, { useEffect, useState } from 'react'
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { Button, Input, Upload, Select, Checkbox, Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import { LocalDiningOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'


const services = ['Catering', 'Beverage', 'Shuttle', 'Staff', 'Assaulting'];
const Services = () => {
    const [checkedValues, setCheckedValues] = useState([]);

    const options = ['Breakfast', 'Lunch', 'Dinner', 'Supper', 'E'];

    const onChange = (checkedValues) => {
        setCheckedValues(checkedValues);
    };
    return (
        <>

            <div className="ManageAccessMain">

                <div className="head">
                    <div className="headingAccess">
                        Select Services
                    </div>
                </div>

                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">City</div>
                            <div className="inputselect">
                                <div className="selecticon"><Flag className='iconInfo' /></div>
                                <Select
                                    placeholder='city'
                                    bordered={false}
                                    // value={formData?.nationality}
                                    className='selector'
                                // onChange={(value) => handleSelectChange("nationality", value)}
                                // options={countryList}
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
                                    // value={formData?.nationality}
                                    className='selector'
                                    // onChange={(value) => handleSelectChange("nationality", value)}
                                    options={services.map(service => ({ value: service, label: service }))}
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
                            {options.map((option) => (
                                <Col span={8} key={option}>
                                    <Checkbox value={option}>{option}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>


                    <Button className='yellowGraBtn'
                    // onClick={manageAccessFunc}
                    >Save</Button>
                </div>
            </div>
        </>
    );
}

export default Services;