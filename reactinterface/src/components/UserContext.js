import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function loadUserData() {
    axios.get(`http://localhost:8000/user/getuser/?token=${localStorage.getItem("token")}`)
    .then((response) => {
      console.log(response.data);
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    loadUserData();
    window.addEventListener('storage', loadUserData); // TODO: Figure out why login and logout doesn't trigger a storage event
    return () => window.removeEventListener('storage', loadUserData);
  }, [])

  return (
    <UserContext.Provider value={{ user, loadUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
