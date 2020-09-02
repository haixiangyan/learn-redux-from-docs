import {createSlice} from '@reduxjs/toolkit'

const initLoading: TLoading = {
  status: false,
  tip: ''
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initLoading,
  reducers: {
    setLoading: (state, action) => {
      return {...state, ...action.payload}
    }
  }
})

export default loadingSlice
