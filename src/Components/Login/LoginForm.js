import React from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import Button from "../Form/Button";
import UseFormHook from "../../Hooks/useFormHook";
import Erro from "../Helper/Erro";
import styles from "./LoginForm.module.css";
import stylesButton from "../Form/Button.module.css";

import { UserContext } from "../../UserContext";
// import Api from '../../OLD_api/Api'

export default function LoginForm() {
  const userName = UseFormHook();
  const password = UseFormHook();

  const { userLogin, erro, load } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (userName.validate() && password.validate()) {
      userLogin(userName.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.fomr} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...userName} />
        <Input label="Senha" type="password" name="password" {...password} />
        {load ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      <Erro erro={erro} />
      <Link className={styles.perdeu} to="/login/perdeu">
        Esqueci minha senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesButton.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
}
