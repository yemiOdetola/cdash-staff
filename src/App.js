import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import AssetDetails from './components/AssetDetails';
import AssetData from './components/AssetData';
import Users from './components/Users';
import Staffs from './components/Staffs';
import UserDetails from './components/UserDetails';
import StaffDetails  from './components/StaffDetails';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
      <Route path='/users/user-data/:id' component={UserDetails} />
      <Route path='/users' component={Users} />
      <Route path='/staffs/staff-data/:id' component={StaffDetails} />
      <Route path='/staffs' component={Staffs} />
      <Route path='/asset-details/:id' component={AssetDetails} />
      <Route path='/asset-data/:id' component={AssetData} />
      <Route path='**' component={Landing} />
    </Switch>
  );
}

export default App;
