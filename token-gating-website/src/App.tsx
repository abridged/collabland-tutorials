import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <div className="body content collabland">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/view" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
