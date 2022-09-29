import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/useContext';
import { signOut } from '../../services/auth';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <header>
      <h1>Todo App</h1>
      {user && <button onClick={handleSignOut}>Sign Out</button>}
    </header>
  );
}