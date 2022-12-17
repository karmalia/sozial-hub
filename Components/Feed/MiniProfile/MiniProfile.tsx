import { useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '../../../Features/hooks';
import { selectUserStatus } from '../../../Features/userSlice';
import profile from '../../../public/assets/profile.jpg';

function MiniProfile() {
  const router = useRouter();

  const userDetails = useAppSelector(selectUserStatus);

  return (
    <div className='bg-white flex justify-between mt-8 px-4 py-2 rounded-tl-lg rounded-tr-lg'>
      <div className='flex items-center '>
        <div className='w-14 h-14 rounded-full'>
          {userDetails.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt='Profile photo'
              className='rounded-full '
              referrerPolicy='no-referrer'
            />
          ) : (
            <Image className='rounded-full' src={profile} alt='profile Image' />
          )}
        </div>

        <p className='pl-3 text-sm font-semibold whitespace-nowrap'>
          {userDetails.displayName ? userDetails.displayName : 'Please log in'}
        </p>
      </div>
      {userDetails.displayName ? (
        <button className='text-sm font-semibold text-blue-900'></button>
      ) : (
        <button
          onClick={() => router.push('./auth/signin')}
          className='text-sm font-semibold text-blue-900'
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default MiniProfile;
