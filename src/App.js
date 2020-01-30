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
import SocialDetails  from './components/SocialDetails';
import ExpensesTurnover from './components/ExpensesTurnover';
import Socials from './components/Socials';
import RecurringExpenditure from './components/RecurringExpenditure';
import CapitalExpenditure from './components/CapitalExpenditure';
import Logs from './components/Logs';
import Summary from './components/Summary';
import Maturity from './components/Maturity';
import AllContainer from './components/AllContainers';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
      <Route path='/logs' component={Logs} />
      <Route path='/summary' component={Summary} />
      <Route path='/all-assets' component={AllContainer} />
      <Route path='/maturity-scores' component={Maturity} />
      <Route path='/expenses-turnover' component={ExpensesTurnover} />
      <Route path='/recurring-expenditure' component={RecurringExpenditure} />
      <Route path='/capital-expenditure' component={CapitalExpenditure} />
      <Route path='/users/user-data/:id' component={UserDetails} />
      <Route path='/users' component={Users} />
      <Route path='/socials/social-data/:id' component={SocialDetails} />
      <Route path='/socials' component={Socials} />
      <Route path='/staffs/staff-data/:id' component={StaffDetails} />
      <Route path='/staffs' component={Staffs} />
      <Route path='/asset-details/:id' component={AssetDetails} />
      <Route path='/asset-data/:id' component={AssetData} />
      <Route path='**' component={Landing} />
    </Switch>
  );
}

export default App;
