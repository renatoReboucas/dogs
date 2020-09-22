import React from 'react'
import { Link } from 'react-router-dom';
import PhotoComments from './PhotoComments';


import styles from "./PhotoContente.module.css";

export default function PhotoContente({data}) {
  const { photo, comments } = data
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
        <div className={styles.details}>
          <div>
            <p>
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
              <span className={styles.visualizacoes} > {photo.acessos} </span>
            </p>
            <h1 className="title">
              <Link to={`/foto/${photo.id}`} > {photo.title} </Link>
            </h1>
            <ul className={styles.attributes}>
              <li> {photo.peso} Kg </li>
              <li> {photo.idade} {photo.idade === 1 ? 'ano' : 'anos'} </li>
            </ul>
          </div>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
}
