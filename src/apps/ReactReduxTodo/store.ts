import {applyMiddleware, createStore} from "redux"
import reducer from "./reducer"
import {composeWithDevTools} from "redux-devtools-extension/index"

const enhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware()
) : undefined

const store = createStore(reducer, enhancer)

export default store
