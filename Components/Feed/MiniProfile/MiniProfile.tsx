import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '../../../Features/hooks';
import { selectUserStatus } from '../../../Features/userSlice';
import profile from '../../../public/assets/profile.jpg';

function MiniProfile() {
  const userDetails = useAppSelector(selectUserStatus);
  return (
    <div className='flex justify-between mt-8'>
      <div className='flex items-center'>
        <div className='w-14 h-14 rounded'>
          {userDetails.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt='Profile photo'
              className='rounded-full '
              referrerPolicy='no-referrer'
            />
          ) : (
            <Image src={profile} alt='profile Image' />
          )}
        </div>

        <p className='pl-3 text-sm font-semibold whitespace-nowrap'>
          {'John Doe'}
        </p>
      </div>
      <button className='text-sm font-semibold text-blue-900'>Sign In</button>
    </div>
  );
}

export default MiniProfile;
