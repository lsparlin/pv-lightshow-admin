import React from 'react';
import axios from 'axios';

import SequenceFormStore from 'stores/SequenceFormStore'
import { setProperty, addColorDuration }  from 'actions/SequenceFormActions'

class SequenceCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = SequenceFormStore.getState()
    this.unsubscribe = undefined
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }
  componentWillMount() {
    this.unsubscribe = SequenceFormStore.subscribe(() => {
      this.setState(SequenceFormStore.getState())
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  onNameChange({target}) {
    SequenceFormStore.dispatch(setProperty(target.id, target.value))
  }
  onFormSubmit(event) {
    event && event.preventDefault()
    let httpMethod = 'PUT' 
    console.log('putting ', {sequence: SequenceFormStore.getState()})
  }

  render() {
    if (!this.state)
      return (<div></div>)

    return (
      <div className="SequenceCreate">
        <h3>New Sequence</h3>
        <form onSubmit={this.onFormSubmit}>

          <div className="row">
            <div className="two columns">
              <label htmlFor="name">Sequence Name</label>
            </div>
            <div className="eight columns">
              <input type="text" className="u-full-width" id="name" value={this.state.name} onChange={this.onNameChange} />
            </div>
          </div>

          <div className="row">
            { this.state.colorSequence.map( (seqItem, index) => (
                  <p key={index}>color: {seqItem.color}</p>
                )
              )
            }
          </div>
          <div className="row">
            <p> Make a new Color Duration </p>
          </div>

          <div className="row">
            <button type="submit" className="button-primary">Save</button>
          </div>

        </form>
      </div>
    )
  }
}


export default SequenceCreate
