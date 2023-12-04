import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: false,
}


export const refreshAPIs = createSlice({
    name: "refreshAPIs",
    initialState,
    reducers: {
        setRefreshUserData: (state, action) => {
            return ({
                ...initialState,
                userData: !initialState.userData
            })
        }
    }

})

export default refreshAPIs.reducer;
export const refreshAPIsActions = refreshAPIs.actions;