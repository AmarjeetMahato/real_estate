import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from ".";
import { useSelector } from "react-redux";
import { Post } from "../../vite-env";



export const fetchStoreAsyncThunk = createAsyncThunk("fetch/storeItem", async() => {
          const currentUser = useSelector((state:RootState)=> state.estate)
          console.log(currentUser.id);
          
    try {
            const response = await axios.get(`/posts/${currentUser.id}`)
            console.log(response.data.post);
            return response.data;
    } catch (error:unknown) {
        return error
    }
})



export interface RealEstate {
    Products: Array<Post>,
    loading:boolean,
    error:string|undefined
}



const initialState: RealEstate = {
    Products : [],
    loading:false,
    error:undefined
  }

export const EstateSlice = createSlice({
    name: 'products',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers:{
        addProducts: (state, action:PayloadAction<Post>) => {
            state.Products = action.payload
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchStoreAsyncThunk.fulfilled,(state, action)=>{
           state.loading = false,
           state.Products= action.payload
        }).addCase(fetchStoreAsyncThunk.pending,(state)=>{
              state.loading = true
        }).addCase(fetchStoreAsyncThunk.rejected,(state, action)=>{
              state.loading = false,
              state.error = action.error.message
        })
  } 

})


export const { addProducts } = EstateSlice.actions
export const selectCount = (state: RootState) => state

export default EstateSlice.reducer