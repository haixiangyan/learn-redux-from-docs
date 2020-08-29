import store from '../apps/ValinaTodo/index'

jest.spyOn(global.console, 'log')

describe('TodoStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
    store.dispatch({type: '@@Init'})
  })

  describe('subscribe', () => {
    it('每次更新 store 会触发 console.log', () => {
      store.dispatch({type: '@@Init'})

      expect(console.log).toBeCalled()
      expect(console.log).toBeCalledWith('can you see me')
    })
  })

  describe('todos', () => {
    it('可以添加一条 Todo', () => {
      const newTodo: TTodo = {
        id: '99',
        text: '吃好吃的',
        state: 'todo',
      }

      store.dispatch({type: 'addTodo', payload: newTodo})

      const todos = store.getState().todos
      expect(todos[todos.length - 1]).toEqual(newTodo)
    })

    it('可以移除一条 Todo', () => {
      const id = '1'

      store.dispatch({type: 'removeTodo', payload: id})

      expect(store.getState().todos.find(todo => todo.text === '抽烟')).toBeUndefined()
    })

    it('可以改变 Todo 的状态', () => {
      const id = '1'

      store.dispatch({type: 'toggleTodo', id})

      expect(store.getState().todos[0].state).toEqual('done')
    })
  })

  describe('filter', () => {
    it('可以只选择已完成的 Todo', () => {
      const newFilter = 'done'

      store.dispatch({type: 'setFilter', payload: newFilter})

      const {todos, filter} = store.getState()
      const filteredTodo = todos.filter(todo => todo.state === filter)

      expect(filteredTodo.length).toEqual(1)
      expect(filteredTodo).toEqual([{
        id: '1',
        text: '抽烟',
        state: 'done'
      }])
    })
  })
})
