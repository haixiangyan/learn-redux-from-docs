import {createSlice} from '@reduxjs/toolkit'
import {
  addTodo,
  fetchTodos,
  removeTodo,
  TAddTodoAction,
  toggleTodo,
  TRemoveTodoAction,
  TSetTodosAction,
  TToggleTodoAction,
  TUpdateTodoAction,
  updateTodo
} from './actionCreators'
import produce from 'immer'

const initTodos: TTodoStore = {
  ids: [],
  entities: {}
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: initTodos,
  reducers: {},
  extraReducers: {
    [fetchTodos.fulfilled.toString()]: (state, action) => {
      const {payload: todos} = action as TSetTodosAction

      const entities = produce<TTodoEntities>({}, draft => {
        todos.forEach(t => {
          draft[t.id] = t
        })
      })

      state.ids = todos.map(t => t.id)
      state.entities = entities
    },
    [addTodo.fulfilled.toString()]: (state, action) => {
      const {payload: newTodo} = action as TAddTodoAction

      state.ids.push(newTodo.id)
      state.entities[newTodo.id] = newTodo
    },
    [removeTodo.fulfilled.toString()]: (state, action) => {
      const {payload: targetId} = action as TRemoveTodoAction

      state.ids = state.ids.filter(id => id !== targetId)
      delete state.entities[targetId]
    },
    [updateTodo.fulfilled.toString()]: (state, action) => {
      const {payload: {id, text}} = action as TUpdateTodoAction

      state.entities[id].text = text
    },
    [toggleTodo.fulfilled.toString()]: (state, action) => {
      const {payload: id} = action as TToggleTodoAction

      const todo = state.entities[id]

      todo.state = todo.state === 'todo' ? 'done' : 'todo'
    }
  }
})

export default todosSlice
