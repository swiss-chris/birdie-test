import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from '@App/components/App';
import Moods from '@App/components/Moods';

ReactDOM.render(
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/moods" component={Moods} />
    </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
