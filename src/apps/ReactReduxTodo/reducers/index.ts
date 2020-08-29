import {combineReducers} from "redux"
import todosReducer from "./todos"
import filterReducer from "./filter"
import loadingReducer from "./loading"

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  loading: loadingReducer
})

export default reducer
