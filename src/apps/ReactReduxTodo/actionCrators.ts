export const addTodo = (newTodo: Partial<TTodo>) => ({
  type: 'addTodo',
  payload: {
    id: new Date().toISOString(),
    ...newTodo
  }
})

export const removeTodo = (id: string) => ({
  type: 'removeTodo',
  payload: id
})

export const toggleTodo = (id: string) => ({
  type: 'toggleTodo',
  payload: id
})

export const setFilter = (filter: TFilter) => ({
  type: 'setFilter',
  payload: filter
})
