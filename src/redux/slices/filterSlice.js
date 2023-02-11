import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryActiveIndex: 0,
    currentPage:1,
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
        },
        setCurrentPage(state,action){
            state.currentPage=action.payload
        },
        setFilters(state,action){
            state.currentPage=Number(action.payload.currentPage);
            state.sort=action.payload.sort;
            state.categoryActiveIndex=Number(action.payload.categoryActiveIndex);
        }
    }
})

export const {setCategoryActiveIndex,setSortType,setCurrentPage,setFilters}=filterSlice.actions

export default filterSlice.reducer
