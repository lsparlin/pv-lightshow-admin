import { createStore } from 'redux';

import ColorDuration from 'sequence/ColorDuration'
import SequenceFormReducers from 'reducers/SequenceFormReducers'

var defaultState = {
  name: '',
  colorSequence: [],
  unsavedColorDuration: new ColorDuration('', 0)
}

export default createStore(SequenceFormReducers, defaultState)
