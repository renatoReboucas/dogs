import React,{useEffect} from 'react'
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

export  const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [load, setLoad] = React.useState(false)
  const [erro, setError] = React.useState(null)
  const navigate = useNavigate()
  
    const userLogout = React.useCallback(
      async function userLogout() {
        setData(null);
        setError(null);
        setLoad(null);
        setLogin(null);
        window.localStorage.removeItem("token");
        navigate("/login");
      },
      [navigate],
    );

  useEffect(() => {
    async function autoLogin(){
      const token = window.localStorage.getItem('token')
      if(token){
        try {
          setError(null)
          setLoad(true)
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const res = await fetch(url, options);
          const json = await res.json();
          if(!res.ok) throw new Error('Token inválido')
          console.log(json);
          await getUser(token)
        } catch (error) {
          console.log('DEU RUIM AUTO LOGIN',error);
          userLogout();
        } finally{
          setLoad(false)
        }
      }else{
        setLogin(false)
      }
    }
    autoLogin()

  },[userLogout])

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
    try {
      setError(null)
      setLoad(true)
    const { url, options } = TOKEN_POST({
      username: username,
      password: password,
    });
      const tokenRes = await fetch(url, options);
      if(!tokenRes.ok) throw new Error(`Usuário invalido`)
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate('/conta')
    } catch (error) { 
      console.log('DEU RUIM TOKEN:', error);
      setError(error.message)
      setLogin(false)
    } finally{
      setLoad(false)
    }
  }



  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, erro, load, login }}>
      {children}
    </UserContext.Provider>
  );
}
