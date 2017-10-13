import React from 'react';
import { withRouter } from 'react-router';

import Requests from 'helpers/Requests';
import SequenceControl from 'sequence/SequenceControl';

class SequenceHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, sequences: [] }
  }
  componentWillMount() {
    Requests.get('/sequence').then(response => {
      this.setState({loading: false, sequences: response.data})
    }).catch(() => this.props.history.push('/login'))
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="row">
          <img src="Spinner.svg" alt="loading..." className="center-content" />
        </div>
      )
    } else{
      return ( <SequenceControl sequences={this.state.sequences} /> )
    }
  }

}

export default withRouter(SequenceHome)
