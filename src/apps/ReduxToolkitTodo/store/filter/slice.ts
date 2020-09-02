import {createSlice} from '@reduxjs/toolkit'
import {SET_FILTER} from './actionTypes'

const initFilter: TFilter = 'all'

const filterSlice = createSlice({
  name: 'filter',
  initialState: initFilter,
  reducers: {
    [SET_FILTER]: (state, action) => {
      return action.payload
    }
  },
})

export default filterSlice
