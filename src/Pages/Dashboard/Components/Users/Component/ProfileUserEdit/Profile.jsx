import React, { useState } from 'react'

import './Profile.scss'
import ProfileBar from './ProfileBar/ProfileBar'
import ManageAccess from './ManageAccess/ManageAccess'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import Schedule from './Schedule/Schedule'
import EducationHistory from './Education/EducationHistory'
import WorkExperience from './Work/Work'
import { BsArrowLeftShort } from 'react-icons/bs'

const Profile = ({openPage, closePage, selectedUser}) =>{

  const [page, setPage] = useState("manageAccess")

  return (
    <>
      <div className="ProfileMain">
        <div className="heading"><BsArrowLeftShort className='icon' onClick={closePage} /> Profile</div>
        <ProfileBar page={page} setPage={setPage} selectedUser={selectedUser}/>
        <div className="ProfileBody">
          {
            page == 'manageAccess' ?
              <ManageAccess page={page} setPage={setPage} selectedUser={selectedUser}/>
              :
              page == 'personalInfo' ?
                <PersonalInfo page={page} setPage={setPage} selectedUser={selectedUser}/>
                :
                page == 'education' ?
                  <EducationHistory page={page} setPage={setPage} selectedUser={selectedUser}/>

                  :
                  page == 'work' ?
                    <WorkExperience page={page} setPage={setPage} selectedUser={selectedUser}/>

                    :
                    page == 'schedule' ?
                      <Schedule page={page} setPage={setPage} selectedUser={selectedUser}/>
                      :
                      <ManageAccess page={page} setPage={setPage} selectedUser={selectedUser}/>
          }
        </div>
      </div>
    </>
  )
}

export default Profile
