import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import LoginPage from 'components/LoginPage'
import SequenceHome from 'sequence/SequenceHome'
import SequenceCreate from 'sequence/SequenceCreate'

const HomePage = (props) => (
  <BrowserRouter>

    <div className="HomePage">
      <h1>Liberty Light Show Control Panel</h1>
      <hr />

      <Switch>
        <Route exact path="/" component={SequenceHome} />
        <Route path="/login" component={LoginPage} />
        <Route path="/create" component={SequenceCreate} />
      </Switch>
    </div>

  </BrowserRouter>
)

export default HomePage
