import {ADD_TODO, REMOVE_TODO, SET_TODOS, TOGGLE_TODO} from "./actionTypes"

type THandlerMapper = {[key: string]: (loading: TTodo[], action: any) => TTodo[]}

const initTodos: TTodo[] = []

const todosReducer = (todos: TTodo[] = initTodos, action: any) => {
  const handlerMapper: THandlerMapper = {
    [SET_TODOS]: (todos, action) => {
      return [...action.payload]
    },
    [ADD_TODO]: (todos, action) => {
      return [...todos, action.payload]
    },
    [REMOVE_TODO]: (todos, action) => {
      return todos.filter(todo => todo.id !== action.payload)
    },
    [TOGGLE_TODO]: (todos, action) => {
      return todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      )
    }
  }

  const handler = handlerMapper[action.type]

  return handler ? handler(todos, action) : todos
}

export default todosReducer
