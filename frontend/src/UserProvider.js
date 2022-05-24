import React, { useState, createContext, useEffect, useContext  } from 'react';
import axios from 'axios';

export const UserContext = createContext()

export function useUserContext(){
  return useContext(UserContext)
}

export const UserProvider = props => {

  const [user, setUser] = useState({logging_in: true});

  useEffect(() => {
    const options = {
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    };
    axios.get(`${process.env.REACT_APP_API_BACKEND}/user`,options)
      .then(function (response) {
            setUser(response.data)
          },
          (error)=>{
            setUser({logging_in: false})
          })
  }, []);

  return (
    <UserContext.Provider value={[user,setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}
