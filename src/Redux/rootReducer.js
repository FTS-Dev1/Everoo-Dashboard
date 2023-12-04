import { combineReducers } from "@reduxjs/toolkit";
import userDataSclice from "./Slice/userData";
import refreshAPIs from "./Slice/refreshAPIs";
import Notification from "./Slice/notification";


export const rootReducer = combineReducers({
    userData: userDataSclice,
    refreshAPIs: refreshAPIs,
    Notification : Notification
})
