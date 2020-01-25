import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import AssetDetails from './components/AssetDetails';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
      <Route path='/asset-details/:id' component={AssetDetails} />
      <Route path='**' component={Landing} />
    </Switch>
  );
}

export default App;
