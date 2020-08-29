import {combineReducers} from "redux"

export const initTodos: TTodo[] = []

const initLoading: TLoading = {
  status: false,
  tip: ''
}

const initFilter: TFilter = 'all'

const todosReducer = (todos: TTodo[] = initTodos, action: any) => {
  switch (action.type) {
    case 'setTodos':
      return [...action.payload]
    case 'addTodo':
      return [...todos, action.payload]
    case 'removeTodo':
      return todos.filter(todo => todo.id !== action.payload)
    case 'toggleTodo':
      return todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      )
    default:
      return todos
  }
}

const filterReducer = (filter: TFilter = initFilter, action: any) => {
  switch (action.type) {
    case 'setFilter':
      return action.payload
    default:
      return filter
  }
}

const loadingReducer = (loading = initLoading, action: any) => {
  switch (action.type) {
    case 'setLoading':
      return {...loading, ...action.payload}
    default:
      return loading
  }
}

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  loading: loadingReducer
})

export default reducer
