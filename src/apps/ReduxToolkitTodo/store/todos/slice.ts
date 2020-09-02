import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {
  addTodo,
  fetchTodos,
  removeTodo,
  TAddTodoAction, toggleTodo,
  TRemoveTodoAction,
  TSetTodosAction, TToggleTodoAction,
  TUpdateTodoAction,
  updateTodo
} from './actionCreators'

const todosAdapter = createEntityAdapter<TTodo>({
  selectId: todo => todo.id,
  sortComparer: (aTodo, bTodo) => aTodo.id.localeCompare(bTodo.id),
})

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action: TSetTodosAction) => {
      todosAdapter.setAll(state, action.payload);
    })

    builder.addCase(addTodo.fulfilled, (state, action: TAddTodoAction) => {
      todosAdapter.upsertOne(state, action.payload)
    })

    builder.addCase(removeTodo.fulfilled, (state, action: TRemoveTodoAction) => {
      todosAdapter.removeOne(state, action.payload);
    })

    builder.addCase(updateTodo.fulfilled, (state, action: TUpdateTodoAction) => {
      todosAdapter.updateOne(state, action.payload)
    })

    builder.addCase(toggleTodo.fulfilled, (state, action: TToggleTodoAction) => {
      const {payload: id} = action as TToggleTodoAction

      const todo = state.entities[id]

      todo!.state = todo!.state === 'todo' ? 'done' : 'todo'
    })
  }
})

export default todosSlice
