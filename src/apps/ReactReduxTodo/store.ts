import {applyMiddleware, combineReducers, createStore} from "redux"
import ReduxThunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension/index"
import todosReducer from "./todos/reducer"
import filterReducer from "./filter/reducer"
import loadingReducer from "./loading/reducer"

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  loading: loadingReducer
})

const enhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware(ReduxThunk)
) :applyMiddleware(ReduxThunk)

const store = createStore(reducer, enhancer)

export default store
