import store, {TTodo} from '../src/Todo'

describe('Todo', () => {
  afterEach(() => {
    store.dispatch({type: '@@Init'})
  })

  describe('todosReducer', () => {
    it('可以添加一条 Todo', () => {
      const newTodo: TTodo = {
        text: '吃好吃的',
        state: 'todo',
      }

      store.dispatch({type: 'addTodo', newTodo})

      expect(store.getState().todos[0]).toEqual(newTodo)
    })

    it('可以移除一条 Todo', () => {
      const index = 0

      store.dispatch({type: 'removeTodo', index})

      expect(store.getState().todos[0]).not.toEqual({
        text: '抽烟',
        done: true
      })

      expect(store.getState().todos.find(todo => todo.text === '抽烟')).toBeUndefined()
    })

    it('可以改变 Todo 的状态', () => {
      const index = 0

      store.dispatch({type: 'toggleTodo', index})

      expect(store.getState().todos[0].state).toBeFalsy()
    })
  })

  describe('filterReducer', () => {
    it('可以只选择已完成的 Todo', () => {
      const newFilter = 'done'

      store.dispatch({type: 'setFilter', newFilter})

      const {todos, filter} = store.getState()
      const filteredTodo = todos.filter(todo => todo.state === filter)

      expect(filteredTodo.length).toEqual(1)
      expect(filteredTodo).toEqual([{
        text: '抽烟',
        state: 'done'
      }])
    })
  })
})
