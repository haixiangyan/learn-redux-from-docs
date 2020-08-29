const initLoading: TLoading = {
  status: false,
  tip: ''
}

const loadingReducer = (loading = initLoading, action: any) => {
  switch (action.type) {
    case 'setLoading':
      return {...loading, ...action.payload}
    default:
      return loading
  }
}

export default loadingReducer
