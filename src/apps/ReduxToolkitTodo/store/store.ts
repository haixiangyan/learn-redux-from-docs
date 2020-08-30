import filterSlice from './filter/slice'
import loadingSlice from './loading/slice'
import todosSlice from './todos/slice'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

const reducer = combineReducers({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
  loading: loadingSlice.reducer
})

const store = configureStore({
  reducer,
  devTools: true
})

export default store
