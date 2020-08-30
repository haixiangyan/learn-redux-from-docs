export const selectFilteredTodos = (state: TStore): TTodo[] => {
  const todos = Object.values(state.todos.entities)

  if (state.filter === 'all') {
    return todos
  }

  return todos.filter(todo => todo.state === state.filter)
}
export const selectTodoNeeded = (state: TStore): number => {
  return Object.values(state.todos.entities).filter(todo => todo.state === 'todo').length
}
