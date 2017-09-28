import React from 'react';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { withRouter } from 'react-router';

import SequencePreview from 'sequence/SequencePreview'

import SequenceFormStore from 'stores/SequenceFormStore'
import { setProperty, setColorDurationProperty, addColorDuration, resetUnsavedColorDuration }  from 'actions/SequenceFormActions'

let sequenceApi = ENV.sequenceApi || 'http://localhost:3000'

class SequenceCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = SequenceFormStore.getState()
    this.unsubscribe = undefined
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  componentWillMount() {
    this.unsubscribe = SequenceFormStore.subscribe(() => {
      this.setState(SequenceFormStore.getState())
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  onPropertyChange({target}) {
    SequenceFormStore.dispatch(setProperty(target.id, target.value))
  }
  onCdPropertyChange({target}) {
    SequenceFormStore.dispatch(setColorDurationProperty(target.id, target.value))
  }
  onColorChange(color) {
    SequenceFormStore.dispatch(setColorDurationProperty('color', color.hex.replace('#', '')))
  }
  addUnsavedColorDuration(event) {
    event && event.preventDefault()
    let colorDuration = SequenceFormStore.getState().unsavedColorDuration
    SequenceFormStore.dispatch(addColorDuration(colorDuration))
    SequenceFormStore.dispatch(resetUnsavedColorDuration())
  }
  onFormSubmit(event) {
    event && event.preventDefault()
    let state = SequenceFormStore.getState()
     axios.put(sequenceApi + '/sequence', { sequence: {
         name: state.name,
         colorSequence: state.colorSequence
       }
     }).then(() => this.props.history.push('/'))
  }

  render() {
    if (!this.state)
      return (<div></div>)

    return (
      <div className="SequenceCreate">
        <h3>New Sequence</h3>
        <div>

          <div className="row">
            <div className="two columns">
              <label htmlFor="name">Sequence Name</label>
            </div>
            <div className="eight columns">
              <input type="text" className="u-full-width" id="name" value={this.state.name} onChange={this.onPropertyChange} />
            </div>
          </div>

          <div className="row">
            <div className="two columns">
              <label> Colors </label>
            </div>
            <div className="eight columns">
            { this.state.colorSequence.map( (seqItem, index) => (
                  <div key={index} className="color-duration">
                    <span className="color-swatch" style={{backgroundColor: '#' + seqItem.color}}> &nbsp; </span>
                    <strong>{seqItem.duration} seconds</strong>
                  </div>
                )
              )
            }
            </div>
          </div>
          <div className="row">
            <div className="two columns"> &nbsp; </div>
            <div className="three columns">
              <ChromePicker color={this.state.unsavedColorDuration.color} onChangeComplete={this.onColorChange} />
            </div>
            <div className="three columns">
              <label htmlFor="duration">Duration (seconds)</label>
              <input type="number" className="u-full-width" id="duration" value={this.state.unsavedColorDuration.duration} onChange={this.onCdPropertyChange} />
            </div>
            <div className="two columns">
              <button onClick={this.addUnsavedColorDuration}>Add</button>
            </div>
          </div>

          <hr />
          <div className="row">
            <SequencePreview colorSequence={this.state.colorSequence} />
            <button className="button-primary float-right" onClick={this.onFormSubmit}>Save</button>
          </div>

        </div>
      </div>
    )
  }
}


export default withRouter(SequenceCreate)
