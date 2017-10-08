import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Requests from 'helpers/Requests'
import SequencePreview from 'sequence/SequencePreview'

const totalDuration = (sequence) =>  sequence.colorSequence.reduce((sum, next) => sum + next.duration, 0)

class SequenceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sequences: [], enableButtons: true};
    this.startSequence = this.startSequence.bind(this)
  }

  componentWillMount() {
    Requests.get('/sequence').then(response => {
      this.setState({sequences: response.data})
    }).catch(() => this.props.history.push('/login'))
  }

  startSequence(name) {
    Requests.put('/sequence/' + name).then(() => {
      this.setState({enableButtons: false})
      var sequence = this.state.sequences.find(item => item.name === name)
      var total = totalDuration(sequence)
      setTimeout(() => {
        this.setState({enableButtons: true})
      }, total * 1000)
    })
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
                  Duration: {totalDuration(sequence)}s
                  <SequencePreview colorSequence={sequence.colorSequence} />
                 </div>
                <div className="three columns">
                  <button disabled={!this.state.enableButtons} onClick={() => this.startSequence(sequence.name)}>{'Run '  + sequence.name}</button>
                </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default withRouter(SequenceControl)
