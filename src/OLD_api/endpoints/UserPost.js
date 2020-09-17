import React, {useState} from 'react'

function UserPost() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event){
    event.preventDefault()
    // console.log(username, email,password);

    fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    }).then(res => {
      console.log("res:",res);
      return res.json()
    }).then(json =>{
      console.log("json:", json);
      return json
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="username"
        value={username}
        onChange={({target}) => setUsername(target.value)}
     />
      <input 
        type="text" 
        placeholder="password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
     />
      <input 
        type="text" 
        placeholder="email"
        value={email}
        onChange={({target}) => setEmail(target.value)}
     />
     <button>Enviar</button>
    </form>
  )
}

export default UserPost
