import {createSlice} from '@reduxjs/toolkit'
import {ADD_TODO, REMOVE_TODO, SET_TODOS, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'
import {
  TAddTodoAction,
  TRemoveTodoAction,
  TSetTodosAction,
  TToggleTodoAction,
  TUpdateTodoAction
} from './actionCreators'
import produce from 'immer'

const initTodos: TTodoStore = {
  ids: [],
  entities: {}
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: initTodos,
  reducers: {
    [SET_TODOS]: (todoState, action) => {
      const {payload: todos} = action as TSetTodosAction

      const entities = produce<TTodoEntities>({}, draft => {
        todos.forEach(t => {
          draft[t.id] = t
        })
      })

      return {
        ids: todos.map(t => t.id),
        entities
      }
    },
    [ADD_TODO]: (todoState, action) => {
      return produce(todoState, draft => {
        const {payload: newTodo} = action as TAddTodoAction

        draft.ids.push(newTodo.id)
        draft.entities[newTodo.id] = newTodo
      })
    },
    [REMOVE_TODO]: (todoState, action) => {
      return produce(todoState, draft => {
        const {payload: targetId} = action as TRemoveTodoAction

        draft.ids = draft.ids.filter(id => id !== targetId)
        delete draft.entities[targetId]
      })
    },
    [UPDATE_TODO]: (todoState, action) => {
      return produce(todoState, draft => {
        const {payload: {id, text}} = action as TUpdateTodoAction

        draft.entities[id].text = text
      })
    },
    [TOGGLE_TODO]: (todoState, action) => {
      return produce(todoState, draft => {
        const {payload: id} = action as TToggleTodoAction

        const todo = draft.entities[id]

        todo.state = todo.state === 'todo' ? 'done' : 'todo'
      })
    }
  }
})

export default todosSlice
