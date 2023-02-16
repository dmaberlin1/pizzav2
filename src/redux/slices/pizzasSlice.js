import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
  async (params,thunkAPI) => {
      const {
          sortBy,
          order,
          category,
          search,
        currentPage
      } = params


      const {data} = await axios.get(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=
            ${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
      if(data.length===0){
          return thunkAPI.rejectWithValue('Пиццы пустые')
      }

      return thunkAPI.fulfillWithValue(data)
  }
)


const initialState = {
    items: [],
    status:'loading', //loading,success, error


}


const pizzasSlice = createSlice({
    name: 'pizza',
    initialState: initialState,
    reducers: {
        setItem(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers:{
        [fetchPizzas.pending]:(state)=>{
            state.status='loading'
            state.items=[];
        }
    },
    [fetchPizzas.fulfilled]:(state,action)=>{
        state.items=action.payload
        state.status='success'
    },
    [fetchPizzas.rejected]:(state,action)=>{
        state.status='error'
        state.items=[]
    }
})


export const selectPizzasData=(state)=>state.pizzas
export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer
