import store from '../src/UserStore';

jest.spyOn(global.console, 'log')

describe('User', function () {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('可以正常改变 UserStore', () => {
    store.dispatch({
      type: 'setEmail',
      email: 'tom@gmail.com'
    })

    expect(store.getState().email).toEqual('tom@gmail.com')
    expect(console.log).toBeCalledWith('can you see me')

    store.dispatch({
      type: 'setPassword',
      password: '123456'
    })

    expect(store.getState().password).toEqual('123456')
    expect(console.log).toBeCalledWith('can you see me')

    expect(console.log).toBeCalledTimes(2)
  })
})
