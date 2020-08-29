import {ADD_TODO, REMOVE_TODO, SET_TODOS, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'
import produce from 'immer'

type THandlerMapper = {[key: string]: (loading: TTodo[], action: any) => TTodo[]}

const initTodos: TTodo[] = []

const todosReducer = (todos: TTodo[] = initTodos, action: any) => {
  const handlerMapper: THandlerMapper = {
    [SET_TODOS]: (todos, action) => {
      return [...action.payload]
    },
    [ADD_TODO]: (todos, action) => {
      return produce(todos, draftTodos => {
        draftTodos.push(action.payload)
      })
    },
    [REMOVE_TODO]: (todos, action) => {
      return todos.filter(todo => todo.id !== action.payload)
    },
    [UPDATE_TODO]: (todos, action) => {
      return produce(todos, draftTodos => {
        const {id, text} = action.payload

        const draftTodo = draftTodos.find(t => t.id === id)

        draftTodo!.text = text
      })
    },
    [TOGGLE_TODO]: (todos, action) => {
      return produce(todos, draftTodos => {
        const draftTodo = draftTodos.find(t => t.id === action.payload)

        draftTodo!.state = draftTodo!.state === 'todo' ? 'done' : 'todo'
      })
    }
  }

  const handler = handlerMapper[action.type]

  return handler ? handler(todos, action) : todos
}

export default todosReducer
