import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/useContext';
import { signOut } from '../../services/Auth.js';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  let name;
  if (user) {
    [name] = user.email.split('@');
  }

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <header>
      <span>Todo App</span>
      {user && 
        <div className="user">
          <span>Hello, {name}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>}
    </header>
  );
}