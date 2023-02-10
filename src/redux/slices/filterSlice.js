import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryActiveIndex: 0,
    sortType: {
        name: 'популярности',
        sortProperty: 'title'
    }
}

const filterSlice=createSlice({
    name:'filters',
    initialState:initialState,
    reducers:{
        setCategoryActiveIndex(state,action){
            state.categoryActiveIndex=action.payload
        },
        setSortType(state,action){
            state.sortType=action.payload
        }
    }
})

export const {setCategoryActiveIndex,setSortType}=filterSlice.actions

export default filterSlice.reducer
