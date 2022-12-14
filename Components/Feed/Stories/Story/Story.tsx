import Image from 'next/image';
import React from 'react';
import { StoryObject } from '../../../../Interfaces/interfaces';

const Story: React.FC<StoryObject> = ({ avatar, username, key }) => {
  console.log('Gelen userstory: ', avatar, username, key);

  return (
    <div className=''>
      <div className=''>
        <img
          className='rounded-full p-[1.5px] border-[3px] border-red-500'
          src={avatar}
          alt='avatar'
        />
        <p className='text-xs w-[60px] truncate text-center'>{username}</p>
      </div>
    </div>
  );
};

export default Story;
