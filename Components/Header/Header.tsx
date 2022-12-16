import styles from './Header.module.scss';

import React from 'react';
import Image from 'next/image';
import arrowdown from '../../public/assets/arrowdown.png';
import search from '../../public/assets/search.png';
import home from '../../public/assets/home.png';
import upload from '../../public/assets/upload.png';
import hearth from '../../public/assets/hearth.png';
import message from '../../public/assets/message.png';
import discover from '../../public/assets/discover.png';
import profile from '../../public/assets/profile.jpg';
import { app } from '../../Features/firebase/firebase';
import { getAuth, signOut as googleSignOut } from 'firebase/auth';
import Link from 'next/link';
import { selectUserStatus } from '../../Features/userSlice';

import { useAppDispatch, useAppSelector } from '../../Features/hooks';
import {
  CHANGE_POPUP_STATE,
  selectOpenStatus,
} from '../../Features/uploadSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const auth = getAuth(app);

  const userDetails = useAppSelector(selectUserStatus);

  console.log('userDetails: ', userDetails);

  function signOutHandler() {
    googleSignOut(auth);
  }

  return (
    <div className={styles.headerContainer}>
      <div className='flex justify-between items-center h-16 max-w-5xl m-auto px-2'>
        {/* Left */}
        <div className={styles.leftSide}>
          <h1 className={styles.logo}>SozialHub</h1>
          <div className={styles.arrowDown}>
            <Image src={arrowdown} alt='arrow down' />
          </div>
        </div>

        {/* Middle */}
        <div className={styles.middle}>
          <div className={styles.searchLogo}>
            <Image src={search} alt='search' />
          </div>
          <input
            className={styles.searchInput}
            type='text'
            placeholder='Search'
          />
        </div>

        {/* Right */}
        <div className={styles.rightSide}>
          <div className={styles.navButtons}>
            <Image src={home} alt='home' />
          </div>
          <div className={styles.navButtons}>
            <Image src={message} alt='message' />
            <div className='absolute flex justify-center items-center -top-1 left-3.5 bg-red-500 rounded-full w-4 h-4 text-xs text-white'>
              1
            </div>
          </div>
          <div
            className={styles.uploadButton}
            onClick={() => dispatch(CHANGE_POPUP_STATE(true))}
          >
            <Image src={upload} alt='upload' />
          </div>
          <div className={styles.navButtons}>
            <Image src={discover} alt='discover' />
          </div>
          <div className={styles.navButtons}>
            <Image src={hearth} alt='hearth' />
          </div>
          <div className='flex'>
            <div className={styles.profilePicture}>
              {userDetails.photoURL ? (
                <img
                  className='rounded-full'
                  src={userDetails.photoURL}
                  alt='profile'
                  referrerPolicy='no-referrer'
                />
              ) : (
                <Image className='rounded-full' src={profile} alt='profile' />
              )}
            </div>
            {userDetails.displayName ? (
              <button
                onClick={() => signOutHandler()}
                className={styles.loginButton}
              >
                Sign out
              </button>
            ) : (
              <Link href='/auth/signin' className={styles.loginButton}>
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
