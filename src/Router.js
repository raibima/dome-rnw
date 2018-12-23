import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './Home'));
const SearchResult = React.lazy(() =>
  import(/* webpackChunkName: "SearchResult" */ './SearchResult')
);

export default () => (
  <React.Suspense fallback={null}>
    <Router>
      <Switch>
        <Route path="/search" component={SearchResult} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </React.Suspense>
);
