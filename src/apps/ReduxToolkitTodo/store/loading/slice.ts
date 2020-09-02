import {createSlice} from '@reduxjs/toolkit'
import {SET_LOADING} from './actionTypes'

const initLoading: TLoading = {
  status: false,
  tip: ''
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initLoading,
  reducers: {
    [SET_LOADING]: (state, action) => {
      return {...state, ...action.payload}
    }
  }
})

export default loadingSlice
