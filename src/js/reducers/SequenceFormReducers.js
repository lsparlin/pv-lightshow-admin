import ColorDuration from 'sequence/ColorDuration'

export default (state, action) => {
  switch(action.type) {
    case 'INIT_SEQUENCE':
      return {sequence: action.data.sequence}
    case 'RESET_UNSAVED_CD':
      let emptyColorDur = new ColorDuration('', 0)
      var newState = Object.assign(state, {unsavedColorDuration: emptyColorDur})
      return newState
    case 'SET_PROPERTY':
      let data = action.data
      var newState = Object.assign(state, {[data.name]: data.value})
      return newState
    case 'SET_CD_PROPERTY':
      let cdData = action.data
      let value = cdData.value
      if (cdData.name === 'duration') 
        value = parseFloat(value)
      var newColorDuration = Object.assign(state.unsavedColorDuration, {[cdData.name]: value})
      var newState = Object.assign(state, {unsavedColorDuration: newColorDuration})
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

