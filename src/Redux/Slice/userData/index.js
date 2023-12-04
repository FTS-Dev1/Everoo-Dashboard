import { createSlice } from "@reduxjs/toolkit";

let localUserData = localStorage.getItem("everooUserData")
const initialState = localUserData ? JSON.parse(localUserData) : null


export const userData = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload
        }
    }

})

export default userData.reducer;
export const userDataActions = userData.actions;