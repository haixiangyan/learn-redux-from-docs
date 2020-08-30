import {createSlice} from '@reduxjs/toolkit'
import {ADD_TODO, REMOVE_TODO, FETCH_TODOS, TOGGLE_TODO, UPDATE_TODO} from './actionTypes'
import {
  TAddTodoAction,
  TRemoveTodoAction,
  TSetTodosAction,
  TToggleTodoAction,
  TUpdateTodoAction
} from './actionCreators'
import produce from 'immer'
import {fetchTodosThunk} from './thunks'

const initTodos: TTodoStore = {
  ids: [],
  entities: {}
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: initTodos,
  reducers: {
    [ADD_TODO]: (state, action) => {
      const {payload: newTodo} = action as TAddTodoAction

      state.ids.push(newTodo.id)
      state.entities[newTodo.id] = newTodo
    },
    [REMOVE_TODO]: (state, action) => {
      const {payload: targetId} = action as TRemoveTodoAction

      state.ids = state.ids.filter(id => id !== targetId)
      delete state.entities[targetId]
    },
    [UPDATE_TODO]: (state, action) => {
      const {payload: {id, text}} = action as TUpdateTodoAction

      state.entities[id].text = text
    },
    [TOGGLE_TODO]: (state, action) => {
      const {payload: id} = action as TToggleTodoAction

      const todo = state.entities[id]

      todo.state = todo.state === 'todo' ? 'done' : 'todo'
    }
  },
  extraReducers: {
    [fetchTodosThunk.fulfilled]: (state, action) => {
      const {payload: todos} = action as TSetTodosAction

      const entities = produce<TTodoEntities>({}, draft => {
        todos.forEach(t => {
          draft[t.id] = t
        })
      })

      state.ids = todos.map(t => t.id)
      state.entities = entities
    }
  }
})

console.log(todosSlice.actions)

export default todosSlice
