import { createStore } from 'redux';

import SequenceFormReducers from 'reducers/SequenceFormReducers'

var defaultState = {
  name: '',
  colorSequence: []
}

export default createStore(SequenceFormReducers, defaultState)
