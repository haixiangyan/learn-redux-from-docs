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
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const {payload: todos} = action as TSetTodosAction

      const entities = produce<TTodoEntities>({}, draft => {
        todos.forEach(t => {
          draft[t.id] = t
        })
      })

      state.ids = todos.map(t => t.id)
      state.entities = entities
    })
    builder.addCase(addTodo.fulfilled, (state, action) => {
      const {payload: newTodo} = action as TAddTodoAction

      state.ids.push(newTodo.id)
      state.entities[newTodo.id] = newTodo
    })

    builder.addCase(removeTodo.fulfilled, (state, action) => {
      const {payload: targetId} = action as TRemoveTodoAction

      state.ids = state.ids.filter(id => id !== targetId)
      delete state.entities[targetId]
    })

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const {payload: {id, text}} = action as TUpdateTodoAction

      state.entities[id].text = text
    })

    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const {payload: id} = action as TToggleTodoAction

      const todo = state.entities[id]

      todo.state = todo.state === 'todo' ? 'done' : 'todo'
    })
  }
})

export default todosSlice
