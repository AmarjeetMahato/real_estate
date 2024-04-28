import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
  id: string,
  username:string,
  avatar:string | null,
  email:string,

}

const initialState: UserState = {
  id:'',
  username:'',
  avatar:null,
  email :'',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    userSignup:(state, action:PayloadAction<UserState>)=> {
      state.id = action.payload.id,
      state.username =action.payload.username,
      state.avatar = action.payload.avatar,
      state.email = action.payload.email
    },
    
    userSignIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id,
      state.email = action.payload.email,
      state.username =action.payload.username,
      state.avatar = action.payload.avatar
    },
    userLogout :(state) => {
           state.id="";
           state.email = "";
           state.username="";
           state.avatar=null;

    },
    userUpdate:(state, action:PayloadAction<UserState>)=> {
      state.id = action.payload.id,
      state.username =action.payload.username,
      state.avatar = action.payload.avatar,
      state.email = action.payload.email
  },
}
})


export const {userSignup, userUpdate, userSignIn ,userLogout} = authSlice.actions



export default authSlice.reducer