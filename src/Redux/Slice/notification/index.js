import { createSlice } from "@reduxjs/toolkit";


const initialState = null


export const Notification = createSlice({
    name: "Notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        }
    }

})

export default Notification.reducer;
export const NotificationActions = Notification.actions;