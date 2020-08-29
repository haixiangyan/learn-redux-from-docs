export const initTodos: TTodo[] = []

const todosReducer = (todos: TTodo[] = initTodos, action: any) => {
  switch (action.type) {
    case 'setTodos':
      return [...action.payload]
    case 'addTodo':
      return [...todos, action.payload]
    case 'removeTodo':
      return todos.filter(todo => todo.id !== action.payload)
    case 'toggleTodo':
      return todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      )
    default:
      return todos
  }
}

export default todosReducer
