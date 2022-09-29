import { createContext, useState } from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);
  const currentUser = getUser();

  return (  
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};
export { UserContext, UserProvider };