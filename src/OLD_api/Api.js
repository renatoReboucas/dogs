import React from 'react'
import PhotoGet from './endpoints/PhotoGet'
import PhotoPost from './endpoints/PhotoPost'
import TokenPost from './endpoints/TokenPost'
import UserPost from './endpoints/UserPost'

function Api() {
  return (
    <div>
      <h2>User Post</h2>
      <UserPost />

      <h2>TokenPost</h2>
      <TokenPost/>

      <h2>PhotoPost</h2>
      <PhotoPost/>

      <h2>Photo get</h2>
      <PhotoGet />
    </div>
  );
}

export default Api
