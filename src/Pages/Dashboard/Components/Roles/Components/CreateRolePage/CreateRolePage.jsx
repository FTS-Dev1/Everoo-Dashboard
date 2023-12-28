import React, { useState, useEffect } from 'react';

// ANT-D | MUI :
import { Switch } from 'antd';
import { Button } from 'antd'

// Assets | ICONS :
import { UserOutlined } from '@ant-design/icons';
import { BsArrowLeftShort } from 'react-icons/bs';

// Components :
import RouteList from "../../../../DashboardRouts";

// APIs :
import { CreateRoleAPI, UpdateRoleAPI } from 'API/role';
// Helper:
import { toast } from 'react-toastify';
import { UniqueArray } from 'Utils/MakeUnique';

// CSS :
import './CreateRolePage.scss';





const CreateRolePage = ({selectedRole, closePage }) => {

  const [roleName, setRoleName] = useState("")
  const [allRoutes, setAllRoutes] = useState([])
  const [allRoutesCopyForEdit, setAllRoutesCopyForEdit] = useState([])
  const [loading, setloading] = useState(false)

  const enteringData = (event) => {
    let { name, value } = event.target;
    setRoleName(value?.toLowerCase());
  }

  const handleSwitch = (route, name, event) => {
    let processPermissions = allRoutes.map((data) => {
      if (data.key == route?.key) {
        return ({
          ...data,
          permissions: data?.permissions?.includes(name) ? data?.permissions.filter(per => per != name) : [...data?.permissions, name]
        })
      } else {
        return data;
      }
    })
    setAllRoutes(processPermissions)
  }


  const handleSaveRole = async () => {
    setloading(true);
    let payload = {
      name: roleName,
      routes: allRoutes
    }
    let res;
    if (selectedRole && selectedRole?._id) {
      res = await UpdateRoleAPI(selectedRole?._id, payload)
    } else {
      res = await CreateRoleAPI(payload)
    }
    if (res.error != null) {
      toast.error("etwas ist schief gelaufen")
    } else {
      toast.success("Operation erfolgreich")
      closePage()
    }
    setloading(false)
  }

  useEffect(() => {
    if (RouteList && RouteList?.length >= 1) {
      let routes = [];
      let process = RouteList.map(data => {
        let keyValue = data?.key?.slice(1)
        if (keyValue && keyValue?.length >= 1) {
          let KeyLabel = keyValue?.split("/")
          KeyLabel = KeyLabel?.map(label => label?.charAt(0).toUpperCase() + label.slice(1))
          routes.push({
            key: data?.key,
            label: KeyLabel.join(" "),
            permissions: []
          })
        }
      })
      setAllRoutes(routes)
      setAllRoutesCopyForEdit(routes)
    }
  }, [])

  const updatingRoutesForEdit = async () => {
    setRoleName(selectedRole?.name)

    let process = allRoutes?.map((route) => {
      let selectedRoutesProcess = selectedRole?.routes?.find(data => data?.key == route?.key)
      if (selectedRoutesProcess) {
        let mergePermissions = [
          ...route?.permissions,
          ...selectedRoutesProcess?.permissions
        ].filter(UniqueArray)

        let finalRoute = {
          ...route,
          permissions: mergePermissions
        }

        return finalRoute
      } else {
        return route
      }
    })
    setAllRoutes(process)
  }
  useEffect(() => {
    if (selectedRole && selectedRole != null && allRoutes && allRoutes?.length >= 1) {
      updatingRoutesForEdit()
    }
  }, [selectedRole, allRoutesCopyForEdit])
  return (
    <>
      <div className="mainCreateRoleContainer">
        <div className="rolemainHeadingArea">
          <BsArrowLeftShort className='icon' onClick={closePage} />
          <h1 className="createRoleHeading"> {selectedRole ? "Edit" : "Create"} Role</h1>
        </div>
        <div className="createRoleContainer">
          <div className="namesearch">Name</div>
          <div className="nameSearchBar">
            <UserOutlined className="icon" />
            <input type="text" placeholder='Role Name' onChange={enteringData} value={roleName} />
          </div>
          <div className="permissionsArea">
            <div className="permissionsrole">Permission:</div>
            {
              allRoutes?.map(route => {
                return (
                  <>
                    <div className="permissioncommonMain">
                      <div className="Role">{route?.label}</div>
                      <div className="permissionCommon">
                        <div className="permissiontoggle">
                          <div className="toggle"><Switch className='swichmain' checked={route?.permissions?.includes("view")} onChange={(event) => handleSwitch(route, "view", event)} /></div>
                          <div className="View">View</div>
                        </div>
                        <div className="permissiontoggle">
                          <div className="toggle"><Switch disabled={!route?.permissions?.includes("view")} className='swichmain' checked={route?.permissions?.includes("create")} onChange={(event) => handleSwitch(route, "create", event)} /></div>
                          <div className="Create">Create</div>
                        </div>
                        <div className="permissiontoggle">
                          <div className="toggle"><Switch disabled={!route?.permissions?.includes("view")} className='swichmain' checked={route?.permissions?.includes("edit")} onChange={(event) => handleSwitch(route, "edit", event)} /></div>
                          <div className="Edit">Edit/Update</div>
                        </div>
                        <div className="permissiontoggle">
                          <div className="toggle"><Switch disabled={!route?.permissions?.includes("view")} className='swichmain' checked={route?.permissions?.includes("delete")} onChange={(event) => handleSwitch(route, "delete", event)} /></div>
                          <div className="Update">Delete</div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
            <Button disabled={!roleName} className='yellowGraBtn createRoleBtn' style={{ width: "120px" }} onClick={handleSaveRole} loading={loading}> {selectedRole ? "Update" : "Save"} </Button>
          </div>
        </div>
      </div>
    </>
  )
}


export default CreateRolePage;