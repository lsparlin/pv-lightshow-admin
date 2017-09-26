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
      console.log(response.data)
      this.setState({sequences: response.data})
    })
  }

  startSequence(name) {
    axios.put(sequenceApi + '/sequence/' + name).then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div className="SequenceControl">
        <div className="row">
          <h3 className="eleven columns"> Sequences </h3>
          <div className="one column"> <Link to="/create" className="button button-primary float-right">Create Sequence</Link> </div>
        </div>
        <div className="header row">
            <div className="two columns"> Sequence </div>
            <div className="two columns"> Length </div>
            <div className="five columns"> Preview </div>
            <div className="three columns"> </div>
        </div>
          { this.state.sequences.map(sequence => 
              ( 
                  <div className="row" key={sequence._id}>
                    <div className="two columns">{sequence.name}</div>
                    <div className="two columns"> {sequence.colorSequence.reduce((sum, next) => sum + next.duration, 0)}s </div>
                    <div className="five columns"> <SequencePreview colorSequence={sequence.colorSequence} /> </div>
                    <div className="three columns"><button onClick={() => this.startSequence(sequence.name)}>{'Run '  + sequence.name}</button></div>
                  </div> 
              )
            )
          }
      </div>
    )
  }
}

export default SequenceControl
