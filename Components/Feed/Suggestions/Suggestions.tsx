import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import styles from './Suggestions.module.scss';
import {
  suggestionTuble,
  SuggestionCreator,
} from '../../../Interfaces/interfaces';

function Suggestions() {
  const [suggestionList, setSuggestionList] = useState<suggestionTuble>([]);
  useEffect(() => {
    setSuggestionList(
      [...Array(5)].map((suggest) => {
        return SuggestionCreator(
          faker.datatype.uuid(),
          faker.internet.userName(),
          faker.image.avatar()
        );
      })
    );
  }, []);

  return (
    <div className={styles.container}>
      {/* Head */}
      <div className={styles.head}>
        <p className={`text-gray-500 text-bold text-sm  my-2`}>
          Suggestions for you
        </p>
        <button className='text-sm'>See All</button>
      </div>
      {/* Intersection */}
      <div className={styles.intersection}>
        {suggestionList.map((profile) => {
          return (
            <div
              className='flex items-center justify-between py-4 bg-white px-4 '
              key={profile.id}
            >
              <div className='flex items-center'>
                <div className='w-10 h-10'>
                  <img
                    className='rounded-full'
                    src={profile.profilePhoto}
                    alt='Profile Photo'
                  />
                </div>
                <div className='ml-4 my-1'>
                  <p className='font-semibold text-sm'>{profile.username}</p>
                  <p className='text-gray-500 text-xs'>Suggested for you</p>
                </div>
              </div>

              <button className='text-blue-400 text-sm font-bold'>
                Follow
              </button>
            </div>
          );
        })}
      </div>
      {/* Body */}
      <div className={styles.body}>
        <p>About</p>
        <span>&#183;</span>
        <p>Help</p>
        <span>&#183;</span>
        <p>Press</p>
        <span>&#183;</span>
        <p>API</p>
        <span>&#183;</span>
        <p>Jobs</p>
        <span>&#183;</span>
        <p>Privacy</p>
        <span>&#183;</span>
        <p>Terms</p>
        <span>&#183;</span>
        <p>Locations</p>
        <span>&#183;</span>
        <p>Language</p>
      </div>
      {/* Footer */}
      <div className={styles.footer}>
        <p>© 2022 derived from Instagram</p>
      </div>
    </div>
  );
}

export default Suggestions;
