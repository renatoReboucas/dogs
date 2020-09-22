import React from 'react'
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";

import styles from './FeedPhotosItem.module.css'
import PhotoContente from './PhotoContente';

export default function FeedModal({photo}) {
  const { data, loading, error, request } = useFetch();

   React.useEffect(() => {
     const { url, options } = PHOTO_GET(photo.id);
     request(url, options);
   }, [photo, request]);

  return (
    <div className={styles.modal}>
      { error && <Erro erro={error} /> }
      { loading && <Loading /> }
      {data && <PhotoContente data={data} /> }
    </div>
  );
}
