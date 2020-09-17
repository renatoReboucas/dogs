import React from 'react'
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = React.createContext()

export  const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [load, setLoad] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function getUser(token){
    const { url, options } = USER_GET(token);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setData(json);
      setLogin(true);
    } catch (error) {
      console.log('DEU RUIM LOGIN:', error);
    }
  }

  async function userLogin(username, password){
    // console.log("userLogin", username, password);
    const { url, options } = TOKEN_POST({
      username: username,
      password: password,
    });
    try {
      const tokenRes = await fetch(url, options);
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      getUser(token);
    } catch (error) {
      console.log('DEU RUIM TOKEN:', error);
    }
  }

  return (
    <UserContext.Provider value={{userLogin, data}}>{children}</UserContext.Provider>
  );
}
