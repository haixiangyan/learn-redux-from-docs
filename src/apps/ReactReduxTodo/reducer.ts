import {combineReducers} from "redux"

const initTodos: TTodo[] = [
  {
    id: '1',
    text: '抽烟',
    state: 'done'
  },
  {
    id: '2',
    text: '喝酒',
    state: 'todo'
  },
  {
    id: '3',
    text: '烫头',
    state: 'todo'
  }
]

const initFilter: TFilter = 'all'

const todosReducer = (state: TTodo[] = initTodos, action: any) => {
  switch (action.type) {
    case 'addTodo':
      return [action.newTodo, ...state]
    case 'removeTodo':
      return state.filter((_, index) => index !== action.index)
    case 'toggleTodo':
      return state.map((todo, index) =>
        action.index === index
          ? {text: todo.text, done: !todo.state}
          : todo
      )
    default:
      return initTodos
  }
}

const filterReducer = (state: TFilter = initFilter, action: any) => {
  switch (action.type) {
    case 'setFilter':
      return action.newFilter
    default:
      return initFilter
  }
}

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
})

export default reducer
