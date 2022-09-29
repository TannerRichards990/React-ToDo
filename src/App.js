import './App.css';
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import Auth from './Components/Auth/Auth';
import { useState } from 'react';
import { getUser } from './services/Auth.js';
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
