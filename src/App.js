import './App.css';
import Header from './components/Header';
import Todos from './components/Todos';
import Auth from './components/Auth';
import { useState } from 'react';
import { getUser } from '../services/auth';
import { Redirect, Route, Switch } from 'react-router-dom';



function App() {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/todos" component={Todos} />
        <Route exact path="/">
          {!user && <Redirect to="/auth/sign-in" />}
          {user && <Redirect to="/todos" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
