import React from 'react';

import axios from 'axios';

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
        <h3> Sequences </h3>
        <div>
          { this.state.sequences.map(sequence => 
              ( <p key={sequence._id}><button onClick={() => this.startSequence(sequence.name)}>{sequence.name}</button></p> )
            )
          }
        </div>
      </div>
    )
  }
}

export default SequenceControl
