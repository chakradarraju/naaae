import React from 'react';
import ServicesTable from './ServicesTable';
import ServiceEditor from './ServiceEditor';
import NotFound from './NotFound';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function ServicesBase() {
  return (<Router>
    <Switch>
      <Route exact path="/services" component={ServicesTable} />
      <Route exact path="/services/new" component={ServiceEditor} />
      <Route path="/services/edit/:index" component={ServiceEditor} />
      <Route path="/services/" component={NotFound} />
    </Switch>
  </Router>);
}