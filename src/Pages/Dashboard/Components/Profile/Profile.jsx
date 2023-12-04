import React, { useState } from 'react'

import './Profile.scss'
import ProfileBar from './ProfileBar/ProfileBar'
import ManageAccess from './ManageAccess/ManageAccess'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import Schedule from './Schedule/Schedule'
import EducationHistory from './Education/EducationHistory'
import WorkExperience from './Work/Work'

export default function Profile() {

  const [page, setPage] = useState("manageAccess")
  return (
    <>
      <div className="ProfileMain">
        <div className="heading">Profile</div>
        <ProfileBar page={page} setPage={setPage} />
        <div className="ProfileBody">
          {
            page == 'manageAccess' ?
              <ManageAccess page={page} setPage={setPage} />
              :
              page == 'personalInfo' ?
                <PersonalInfo />
                :
                page == 'education' ?
                  <EducationHistory page={page} setPage={setPage} />

                  :
                  page == 'work' ?
                    <WorkExperience page={page} setPage={setPage} />

                    :
                    page == 'schedule' ?
                      <Schedule page={page} setPage={setPage} />
                      :
                      <ManageAccess page={page} setPage={setPage} />



          }
        </div>
      </div>
    </>
  )
}
