import React from 'react'
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";

import styles from './FeedModal.module.css'
import PhotoContent from './PhotoContent';

export default function FeedModal({photo,setModalPhoto}) {
  const { data, loading, error, request } = useFetch();

   React.useEffect(() => {
     const { url, options } = PHOTO_GET(photo.id);
     request(url, options);
   }, [photo, request]);

   function handleOutsideClick(e){
      if(e.target === e.currentTarget) setModalPhoto(null)
   }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      { error && <Erro erro={error} /> }
      { loading && <Loading /> }
      {data && <PhotoContent data={data} /> }
    </div>
  );
}
