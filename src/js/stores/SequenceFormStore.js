import { createStore } from 'redux';

import ColorDuration from 'sequence/ColorDuration'
import SequenceFormReducers from 'reducers/SequenceFormReducers'

export default createStore(SequenceFormReducers.reduceAction, SequenceFormReducers.getDefaultState())
