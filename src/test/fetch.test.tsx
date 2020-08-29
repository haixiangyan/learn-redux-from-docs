import fetch from "../api"

jest.useFakeTimers()

describe('fetch', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('指定时间返回结果', (done) => {
    const fn = jest.fn(() => 'hello')

    fetch('/xxx', fn).then(result => {
      expect(result).toEqual('hello')
      done()
    })

    jest.runTimersToTime(3000)
  })
})
