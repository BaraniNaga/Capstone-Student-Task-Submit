import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TaskList from '../task-list.component';
import Login from '../Login/Login';


function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/taskList">
            <TaskList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;