import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import SequencePreview from 'sequence/SequencePreview'

let sequenceApi = ENV.sequenceApi || 'http://localhost:3000'

class SequenceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sequences: []};
  }

  componentWillMount() {
    axios.get(sequenceApi + '/testdb').then(response => {
      this.setState({sequences: response.data})
    })
  }

  startSequence(name) {
    axios.put(sequenceApi + '/sequence/' + name)
  }

  render() {
    return (
      <div className="SequenceControl">
        <div className="row">
          <h3 className="eleven columns"> Sequences </h3>
          <div className="one column"> <Link to="/create" className="button button-primary float-right">Create Sequence</Link> </div>
        </div>
        { this.state.sequences.map(sequence => 
          (
            <div key={sequence._id} className="sequence row">
                <div className="three columns">
                  <h4>{sequence.name} </h4>
                </div>
                <div className="six columns">
                  Duration: {sequence.colorSequence.reduce((sum, next) => sum + next.duration, 0)}s
                  <SequencePreview colorSequence={sequence.colorSequence} />
                 </div>
                <div className="three columns">
                  <button onClick={() => this.startSequence(sequence.name)}>{'Run '  + sequence.name}</button>
                </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default SequenceControl
