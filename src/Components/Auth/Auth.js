import { useContext } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/useContext';
import { authUser, getUser } from '../../services/Auth.js';
import './Auth.css';


export default function Auth() {
  const { type } = useParams();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await authUser(email, password, type);

    setUser(getUser());
    
    e.target.reset();
  };

  if (user) {
    return <Redirect to='/todos' />;
  }

  return (
    <div className="Auth">
      <ul>
        <li>
          <NavLink to="/auth/sign-in">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/auth/sign-up">Sign Up</NavLink>
        </li>
      </ul>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
        
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <button type="submit">{type}</button>
      </form>
    </div>
  );
}
