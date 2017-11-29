import React from 'react';
import { withRouter } from 'react-router';

import Requests from 'helpers/Requests';
import SequenceControl from 'sequence/SequenceControl';

class SequenceHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loadingSeq: true,loadingSettings: true, sequences: [] }
  }
  componentWillMount() {
    Requests.get('/sequence').then(response => {
      this.setState({loadingSeq: false, sequences: response.data})
    }).catch(() => this.props.history.push('/login'))
    Requests.get('/settings').then(response => {
      this.setState({loadingSettings: false, settings: response.data})
    })
  }

  render() {
    if (this.state.loadingSeq || this.state.loadingSettings) {
      return (
        <div className="row">
          <img src="Spinner.svg" alt="loading..." className="center-content" />
        </div>
      )
    } else{
      return ( <SequenceControl sequences={this.state.sequences} settings={this.state.settings} /> )
    }
  }

}

export default withRouter(SequenceHome)
