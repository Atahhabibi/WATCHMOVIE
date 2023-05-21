import { createSlice } from "@reduxjs/toolkit"



const initialState={
 url:{},
 genres:{},
}


export const homeSlice=createSlice({
    name:'home',
    initialState,
    reducers:{
        getApiConfiguartion:(state,action)=>{
            state.url=action.payload;
        },
        
        getGeners:(state,action)=>{
            state.genres=action.payload;
        }

    }

})


export default homeSlice.reducer;


export const {getApiConfiguartion,getGeners} =homeSlice.actions;