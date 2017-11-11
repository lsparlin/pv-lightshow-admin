import React from 'react';
import { ChromePicker } from 'react-color';
import { withRouter } from 'react-router';

import Requests from 'helpers/Requests'
import SequencePreview from 'sequence/SequencePreview'

import SequenceFormStore from 'stores/SequenceFormStore'
import { setProperty, setColorDurationProperty, addColorDuration, resetUnsavedColorDuration }  from 'actions/SequenceFormActions'

class SequenceCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = SequenceFormStore.getState()
    this.unsubscribe = undefined
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  componentWillMount() {
    Requests.get().catch(() => this.props.history.push('/login'))

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
    if (colorDuration.duration) {
      SequenceFormStore.dispatch(addColorDuration(colorDuration))
      SequenceFormStore.dispatch(resetUnsavedColorDuration())
    }
  }
  onFormSubmit(event) {
    event && event.preventDefault()
    let state = SequenceFormStore.getState()
    if (state.name && state.colorSequence.length > 2) {
      let requestObj = { sequence: SequenceFormStore.getState() }
      Requests.put('/sequence', requestObj).then(() => this.props.history.push('/'))
    }
  }

  render() {
    if (!this.state)
      return (<div></div>)

    return (
      <div className="SequenceCreate">
        <div className="row">
          <h3>New Sequence</h3>
        </div>
        <div className="row">
          <div className="two columns"> 
            <label> Preview </label>
          </div>
          <div className="ten columns">
            <SequencePreview colorSequence={this.state.colorSequence} />
          </div>
        </div>
        <div>

          <div className="row">
            <div className="two columns">
              <label htmlFor="name">Sequence Name</label>
            </div>
            <div className="ten columns">
              <input type="text" className="u-full-width" id="name" value={this.state.name} onChange={this.onPropertyChange} />
            </div>
          </div>

          <div className="row margin-top-1m">
            <div className="two columns">
              <label> Colors </label>
            </div>
            <div className="five columns">
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

          <div className="row">
            <div className="two columns">
              <label> &nbsp; </label>
            </div>
            <div className="ten columns">
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

          <hr />
          <div className="row">
            <button className="button-primary float-right" onClick={this.onFormSubmit}>Save</button>
          </div>

        </div>
      </div>
    )
  }
}


export default withRouter(SequenceCreate)
