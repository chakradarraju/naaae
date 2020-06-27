import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import ServicesBase from './ServicesBase';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Redirect exact from="/" to="/services" />
          <Route path="/services" component={ServicesBase} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
