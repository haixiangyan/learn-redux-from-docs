const initFilter: TFilter = 'all'

const filterReducer = (filter: TFilter = initFilter, action: any) => {
  switch (action.type) {
    case 'setFilter':
      return action.payload
    default:
      return filter
  }
}

export default filterReducer
