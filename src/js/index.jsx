require('style/normalize.css')
require('style/skeleton.css')
// require('style/custom-bootstrap.min.css')

require('scss/main.scss')

import React from 'react';
import {render} from 'react-dom';

import HomePage from 'components/HomePage'

render((
    <div>
      <HomePage />
    </div>
  ), document.getElementById('app')
);

