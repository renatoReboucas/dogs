import React from 'react'
import UserHeaderNav from './UserHeaderNav'

import styles from "./UserHeader.module.css";
import { useLocation } from 'react-router-dom';

export default function UserHeader() {
  const [title, setTitle] = React.useState('')

  const location =  useLocation()

  React.useEffect(() => {
    const {pathname} = location
    setTitle(location.pathname)
    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste sua Foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
        default:
          setTitle('Minha Conta')
    }
  },[location])

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  )
}
