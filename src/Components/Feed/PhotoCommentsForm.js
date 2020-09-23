import React from 'react'
import { ReactComponent as Enviar } from '../../Assets/enviar.svg'
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Erro from "../Helper/Erro";

import styles from "./PhotoCommentsForm.module.css";

export default function PhotoCommentsForm({ id, setComments }) {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { res, json } = await request(url, options);
    console.log(json);
    if (res.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        value={comment}
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        {" "}
        <Enviar />{" "}
      </button>
      <Erro erro={error} />
    </form>
  );
}
