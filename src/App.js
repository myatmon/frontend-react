import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ApplianceList from './components/ApplianceList';
import CreateApplianceComponent from './components/CreateApplianceComponent';
import ViewApplianceComponent from './components/ViewApplianceComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={ApplianceList}></Route>
            <Route path="/appliances" component={ApplianceList}></Route>
            <Route path="/add-appliance/:id" component={CreateApplianceComponent}></Route>
            <Route path="/view-appliance/:id" component={ViewApplianceComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
