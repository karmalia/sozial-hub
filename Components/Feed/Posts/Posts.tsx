import React from 'react';
import styles from './Posts.module.scss';
import profile from '../../../public/assets/profile.jpg';
import Post from './Post/Post';
import { PostDocument } from '../../../Interfaces/interfaces';
function Posts() {
  //temporary user post documents: will be replaced by docs from firebase
  const posts: PostDocument[] = [
    {
      id: '123',
      username: 'Joe Doe',
      profilePic: profile,
      postPhoto: profile,
      caption:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est nisi, condimentum vitae fringilla a, porta at dolor. Vestibulum non mi leo. Aliquam purus lectus, gravida quis posuere id, aliquam et diam. Aliquam id purus vitae odio ultricies fringilla sed a lorem. Donec fringilla tempor pretium. Curabitur convallis eu magna.',
      comments: [
        {
          username: 'John Doe',
          comment: 'Hello from the comment section',
        },
        {
          username: 'Marry Doe',
          comment: 'Hello from the comment section',
        },
      ],
    },
    {
      id: '234',
      username: 'Mike Doe',
      profilePic: profile,
      postPhoto: profile,
      caption:
        'Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est nisi, condimentum vitae fringilla a, porta at dolor. Vestibulum non mi leo. Aliquam purus lectus, gravida quis posuere id, aliquam et diam. Aliquam id purus vitae odio ultricies fringilla sed a lorem. Donec fringilla tempor pretium. Curabitur convallis eu magna.',
      comments: [
        {
          username: 'John Doe',
          comment: 'Hello from the comment section',
        },
        {
          username: 'Marry Doe',
          comment: 'Hello from the comment section',
        },
      ],
    },
  ];

  return (
    <div className='mt-1 mx-1'>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            profilePic={post.profilePic}
            postPhoto={post.postPhoto}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </div>
  );
}

export default Posts;
