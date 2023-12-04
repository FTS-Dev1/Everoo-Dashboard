import React, { useState, useEffect} from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { Button, Input, InputNumber ,Switch} from "antd";
// CSS :
import "./SetCharges.scss";
import { SetCommission } from 'API/setComission';
const SetCharges = ({ closePage,selectedService }) => {

    const [disabled, setDisabled] = useState(true);
    const [commissionEnabled, setCommissionEnabled] = useState(true);
    const [meetingCommission, setMeetingCommission] = useState(selectedService?.serviceCommission || 20);

    const onChange = (value) => {
        setMeetingCommission(value); 
    };
    const toggle = () => {
        // setDisabled(!disabled);
        setCommissionEnabled(!commissionEnabled);
      };

      useEffect(() => {
        console.log(selectedService,"selectedService")
    }, [selectedService]);
     

      const setCharges = async () => {
        try {
          const commissionData = {
            serviceCommission: meetingCommission,
            serviceName: selectedService?.serviceName,
          };
    
          const result = await SetCommission(selectedService._id,commissionData);
    
          if (result.error) {
            // Handle error here
            console.error(result.error);
          } else {
            // Handle success here
            console.log(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>

            <div className="flexLineSpace">
                <div className="heading "><BsArrowLeftShort className="icon" onClick={closePage} />Site Setting</div>
            </div>

            <div className="SetBodyMain">
                <div className="SetCharges">
                    <div className="inputFields">
                        <div className="lableName">
                           <h5>{selectedService?.serviceName}</h5> 
                            {/* <div className="toggle"><Switch className='swichmain' checked={commissionEnabled} onChange={toggle}/></div> */}
                        </div>
                        <InputNumber
                            size="large"
                            className="eventInput"
                            defaultValue={20}
                            min={0}
                            max={100}
                            // disabled={disabled}
                            formatter={(value) => `${value}%`}
                            // parser={(value) => value!.replace('%', '')}
                            value={meetingCommission}
                            onChange={onChange}
                        />
                        <div className="BtnReadMore">
                            <Button className="readMoreBtn" onClick={setCharges} >Set Charges</Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SetCharges;