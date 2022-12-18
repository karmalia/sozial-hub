import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { PostDocument } from '../../../../Interfaces/interfaces';
import dots from '../../../../public/assets/dots.png';
import hearth from '../../../../public/assets/hearth.png';
import redhearth from '../../../../public/assets/redhearth.png';
import comment from '../../../../public/assets/comment.png';
import message from '../../../../public/assets/message.png';
import save from '../../../../public/assets/save.png';
import emojy from '../../../../public/assets/emojy.png';
import profile from '../../../../public/assets/profile.jpg';
import { format, parse } from 'date-fns';

import { formatDistance } from 'date-fns';
import { useAppSelector } from '../../../../Features/hooks';
import { selectUserStatus } from '../../../../Features/userSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../Features/firebase/firebase';
import {
  useHandleLikeMutation,
  useAddCommentMutation,
} from '../../../../Features/firebaseApi';
import { toast } from 'react-toastify';
import { idText } from 'typescript';

const Post: React.FC<PostDocument> = ({
  id,
  username,
  profilePic,
  postPhoto,
  caption,
  comments,
  timestamp,
  likes,
  likedUsers,
}) => {
  const userDetails = useAppSelector(selectUserStatus);
  const [hasLiked, setHasLiked] = useState<Boolean>(false);

  useEffect(() => {
    setHasLiked(likedUsers?.includes(userDetails.uid));
  }, [likes]);

  const commentRef = useRef<HTMLInputElement>(null);

  //seperate this as a func
  const formattedTimestamp = format(timestamp.toDate(), 'MM/dd/yyyy HH:mm:ss');

  const date = parse(formattedTimestamp, 'MM/dd/yyyy HH:mm:ss', new Date(0));

  const diffInHours = formatDistance(new Date(), date, {
    includeSeconds: true,
  });

  const [handleLike] = useHandleLikeMutation();
  const [addComment] = useAddCommentMutation();
  return (
    <div className=''>
      <div className='border rounded-lg my-3 bg-white'>
        {/* Header */}
        <div className='flex items-center p-3'>
          <div className='flex items-center w-full'>
            <div className='h-10 w-10 mr-3'>
              <img
                src={profilePic}
                className='rounded-full border h-10 w-10'
                alt='profilePhoto'
              />
            </div>
            <div className=''>
              <p className='font-semibold text-sm'>{username}</p>
              <p className='text-sm'>Captured by you </p>
            </div>
          </div>

          <div className='h-6 w-6'>
            <Image src={dots} alt='Click for more' />
          </div>
        </div>
        {/* Photo */}
        <div className='h-[30rem]'>
          <img
            src={postPhoto !== 'null' ? postPhoto : profile}
            alt='Image'
            className='
            h-full w-full object-cover'
          />
        </div>

        {/* Buttons */}
        <div className='mt-3 mx-3'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-3'>
              <div className='w-7'>
                <Image
                  onClick={() => {
                    //Decrease the like and remove the user's id from the documents array list.

                    if (!hasLiked) {
                      handleLike({
                        type: 'increase',
                        USER_ID: userDetails.uid,
                        docId: id,
                        likes,
                        likedUsers,
                      });
                    } else {
                      handleLike({
                        type: 'decrease',
                        USER_ID: userDetails.uid,
                        docId: id,
                        likes,
                        likedUsers,
                      });
                    }
                  }}
                  src={hasLiked ? redhearth : hearth}
                  alt='Add favorite list'
                  className='cursor-pointer'
                />
              </div>
              <div className='w-7'>
                <Image src={comment} alt='Create a comment' />
              </div>
              <div className='w-7'>
                <Image src={message} alt='Share' />
              </div>
            </div>
            <div className='w-7 mr-3'>
              <Image src={save} alt='Save this post' />
            </div>
          </div>
          <div className='mt-2 customfont'>{likes} Likes</div>
        </div>

        {/* Caption */}
        <div className='flex items-center mx-3'>
          <p className='customfont mr-2 whitespace-nowrap'>{username}</p>
          <p className='truncate'>{caption}</p>
        </div>

        {/* View all comments */}
        <p className='text-gray-500 text-sm mt-1 my-2 mx-3'>
          View all 325 comments
        </p>
        {/* Comments */}
        <div className='mx-3'>
          {comments?.map(({ username, comment }, index) => {
            return (
              <div
                key={index}
                className='flex justify-between items-center max-w-24 overflow-y-auto'
              >
                <div className='flex items-center truncate'>
                  <p className='customfont mr-2'>{username}</p>
                  <p className='truncate mr-2'>{comment}</p>
                </div>
                <div className='h-4 w-4 shrink-0'>
                  <Image src={hearth} alt='PPhoto' />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timestamp */}
        <p className='text-gray-400 text-xs my-2 mx-3'>{diffInHours} ago</p>
        {/* Border */}
        <div className='border-t mx-3 my-2'></div>
        {/* Inputs */}
        <div className='flex justify-between items-center m-3'>
          <div className='flex space-x-2'>
            <div className=''>
              <Image
                className='w-7 h-7'
                src={emojy}
                alt='Add Emoji'
                width={10}
              />
            </div>
            <input
              ref={commentRef}
              type='text'
              name='comment'
              id='comment'
              placeholder='Add a comment...'
              className='border pl-2 w-full outline-0'
            />
          </div>
          <button
            className='h-full w-10 font-semibold text-blue-500 text-sm'
            onClick={() => {
              const commentValue =
                commentRef && commentRef.current
                  ? commentRef.current.value
                  : '';

              addComment({
                id: id,
                comment: {
                  username: userDetails.displayName ?? 'Guest',
                  comment: commentValue,
                },
              });
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
