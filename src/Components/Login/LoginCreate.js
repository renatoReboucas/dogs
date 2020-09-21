import React from 'react'
import Input from '../Form/Input'
import Button from '../Form/Button'
import useForm from '../../Hooks/useFormHook'
import { USER_POST } from '../../api'
import {UserContext} from '../../UserContext'

export default function LoginCreate() {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const {userLogin} = React.useContext(UserContext)

  async function handleSubmit(e){
    e.preventDefault()
    const {url, options} = USER_POST({
      username: username.value,
      email: email.value,
      password:password.value,
    })
    const res = await fetch(url,options)
    if(res.ok) userLogin(username.value,password.value)
    // console.log(res);
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
      <Input label="Usuário" type="text" name="username" {...username} />
      <Input label="E- mail" type="email" name="email" {...email} />
      <Input label="Senha" type="password" name="password" {...password} />
      <Button>Cadastrar</Button>
      </form>
    </section>
    );
}
