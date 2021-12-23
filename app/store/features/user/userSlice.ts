import {createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  credentials: {
    mobile:string;
    password:string
  } | undefined
}

const initialState: UserState = {
  credentials: undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state,action: PayloadAction<{mobile:string;password:string}>) => {
      const{mobile,password}=action.payload
      // Demo user credentials
      if(mobile==='9778207807'&& password==='password'){
        state.credentials=action.payload
      }
      else{
      // Show incorrect credentials alert
      }
    },
    logoutUser: (state) => {
      state.credentials=undefined
    },
  },
})

const { actions, reducer } = userSlice
export const {loginUser,logoutUser} = actions
export default reducer