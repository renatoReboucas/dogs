import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Form/Input'
import Button from '../Form/Button'
import UseFormHook from '../../Hooks/useFormHook'

import {UserContext} from '../../UserContext'
// import Api from '../../OLD_api/Api'

export default function LoginForm() {
  const userName = UseFormHook()
  const password = UseFormHook()

  const {userLogin, error, load} = React.useContext(UserContext)

  async function handleSubmit(e){
    e.preventDefault()

    if( userName.validate() && password.validate() ){
      userLogin(userName.value, password.value)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...userName} />
        <Input label="Senha" type="password" name="password" {...password} />
        {load ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </div>
  );
}
