import React from 'react'
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch'


import styles from "./PhotoDelet.module.css";

export default function PhotoDelet({id}) {
  const {loading, request } = useFetch()

async function handleClick(e){
  const confirm = window.confirm('Tem certeza que deseja deletar?')
  if(confirm){
    const { url, options } = PHOTO_DELETE(id);
    const { res } = await request(url, options);
    if (res.ok) window.location.reload();
  }
  
}

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
}
