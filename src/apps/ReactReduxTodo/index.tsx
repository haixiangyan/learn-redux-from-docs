import * as React from "react"
import {Provider} from 'react-redux'
import {FC} from "react"
import store from "./store/store"
import TodoApp from "./TodoApp"

const ReactReduxTodo: FC = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

export default ReactReduxTodo
