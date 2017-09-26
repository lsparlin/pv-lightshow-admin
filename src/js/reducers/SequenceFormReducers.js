
export default (state, action) => {
  switch(action.type) {
    case 'INIT_SEQUENCE':
      return {sequence: action.data.sequence}
    case 'SET_PROPERTY':
      let data = action.data
      var newState = Object.assign(state, {[data.name]: data.value})
      return newState
    case 'ADD_COLOR_DURATION':
      let colorDuration = action.data.colorDuration
      let colorSeq = state.colorSequence
      colorSeq.push(colorDuration)
      var newState = Object.assign(state, {colorSequence: colorSeq})
      return newState
    default:
      return state
  }
}

