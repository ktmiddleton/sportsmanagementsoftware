import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  function loadUserData() {
    axios.get(`${process.env.REACT_APP_DJANGO_SERVER_URL}/user/getuser/?token=${localStorage.getItem("token")}`)
    .then((response) => {
      console.log(response.data);
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function userHasGroup(groupName) {
    if (user !== undefined && user.groups !== undefined) {
        return user.groups.some((group) => group.name === groupName);
    }
  }

  function userHasPerm(permCodeName) {
    let hasPerm = false;
    if (user !== undefined && user.groups !== undefined) {
        user.groups.forEach((group) => {
            group.permissions.forEach((perm) => {
                if (perm.codename === permCodeName) {
                    hasPerm = true;
                }
            });
        })
    }
    return hasPerm;
  }

  function userInClubTeam(teamId) {
    return user.club_team_member.some((team) => team.id === teamId);
  }

  function userCaptainingTeam(teamId) {
    return user.club_team_captain.some((team) => team.id === teamId);
  }

  useEffect(() => {
    loadUserData();
    window.addEventListener('storage', loadUserData); // TODO: Figure out why login and logout doesn't trigger a storage event
    return () => window.removeEventListener('storage', loadUserData);
  }, [])

  return (
    <UserContext.Provider value={{ user, loadUserData, userHasGroup, userHasPerm, userInClubTeam, userCaptainingTeam }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
