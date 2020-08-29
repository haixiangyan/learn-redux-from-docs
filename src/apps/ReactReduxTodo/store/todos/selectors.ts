export const selectFilteredTodos = (state: TStore) => {
  if (state.filter === 'all') {
    return state.todos
  }

  return state.todos.filter(todo => todo.state === state.filter)
}
export const selectTodoNeeded = (state: TStore) => {
  return state.todos.filter(todo => todo.state === 'todo').length
}
