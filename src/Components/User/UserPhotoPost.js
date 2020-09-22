import React from 'react'
import useForm from '../../Hooks/useFormHook'
import useFetch from "../../Hooks/useFetch";
import Input from '../Form/Input'
import Button from "../Form/Button";
import {PHOTO_POST} from '../../api'
import Erro from '../Helper/Erro'

import styles from "./UserPhotoPost.module.css";
import { useNavigate } from 'react-router-dom';

export default function UserPhotoPost() {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate()

  React.useEffect(() => {
    if(data) navigate('/conta')
  },[data, navigate])

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({target}){
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="text" name="peso" {...peso} />
        <Input label="Idade" type="text" name="idade" {...idade} />
        <Input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange} />
        { loading ?(
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        ) }
        <Erro  erro={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
}
