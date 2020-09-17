import React from 'react'

function PhotoGet() {
  function handleSubmit(e){
    e.preventDefault()
    fetch("https://dogsapi.origamid.dev/json/api/photo").then(res =>{
      console.log("img",res);
      return res.json()
    }).then(json => {
      console.log(json);
      return json
    })
  }
  return <form onSubmit={handleSubmit}>
    <input type="text" name="" id=""/>
    <button>Get</button>
  </form>;
}

export default PhotoGet
