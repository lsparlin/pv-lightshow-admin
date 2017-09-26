import ColorDuration from 'sequence/ColorDuration'

function initSequence() {
  return {
    type: 'INIT_SEQUENCE',
    data: {
      name: '',
      colorSequence: []
    }
  }
}

function resetUnsavedColorDuration() {
  return { type: 'RESET_UNSAVED_CD' } 
}

function setProperty(propertyName, newValue) {
  return {
    type: 'SET_PROPERTY',
    data: {
      name: propertyName,
      value: newValue
    }
  }
}

function setColorDurationProperty(propertyName, newValue) {
  return {
    type: 'SET_CD_PROPERTY',
    data: {
      name: propertyName,
      value: newValue
    }
  }
}

function addColorDuration(colorDuration) {
  return {
    type: 'ADD_COLOR_DURATION',
    data: {
      colorDuration: colorDuration
    }
  }
}

export {
  initSequence,
  resetUnsavedColorDuration,
  setProperty,
  setColorDurationProperty,
  addColorDuration
}
