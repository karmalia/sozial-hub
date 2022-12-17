import React, { useEffect, useState } from 'react';
import styles from './Posts.module.scss';
import profile from '../../../public/assets/profile.jpg';
import Post from './Post/Post';
import { PostDocument, TPosts } from '../../../Interfaces/interfaces';
import { useGetPostsQuery } from '../../../Features/firebaseApi';

function Posts() {
  const { data, isError, isFetching } = useGetPostsQuery();

  useEffect(() => {
    if (data) {
      console.log('Gelen postslar: ', data);
    }
  }, [isFetching]);

  return (
    <div className='mt-1 mx-1'>
      {data?.map((post: PostDocument) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            profilePic={post.profilePic}
            postPhoto={post.postPhoto}
            caption={post.caption}
            comments={post.comments}
            timestamp={post.timestamp}
            likes={post.likes}
            likedUsers={post.likedUsers}
          />
        );
      })}
    </div>
  );
}

export default Posts;
