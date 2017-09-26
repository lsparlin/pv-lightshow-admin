import React from 'react';

class SequenceCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      sequence: {
        name: '',
        colorSequence: []
      }
    }
  }

  render() {

    return (
      <div className="SequenceCreate">
        <h3>New Sequence</h3>
      </div>
    )
  }
}

export default SequenceCreate
