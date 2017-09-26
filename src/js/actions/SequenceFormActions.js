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

function setProperty(propertyName, newValue) {
  return {
    type: 'SET_PROPERTY',
    data: {
      name: propertyName,
      value: newValue
    }
  }
}

function addColorDuration(color, duration) {
  return {
    type: 'ADD_COLOR_DURATION',
    data: {
      colorDuration: new ColorDuration(color, duration)
    }
  }
}

export {
  initSequence,
  setProperty,
  addColorDuration
}
