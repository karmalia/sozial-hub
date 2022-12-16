import React from 'react';
import MiniProfile from './MiniProfile/MiniProfile';
import Posts from './Posts/Posts';
import Stories from './Stories/Stories';
import Suggestions from './Suggestions/Suggestions';

export default function Feed() {
  return (
    <div className='flex max-w-[790px] mt-4 mx-auto lg:max-w-[854px]'>
      <section className='max-w-[470px] mx-auto w-[100vw]'>
        <Stories />
        <Posts />
      </section>
      <section className='max-w-[320px] w-full mx-8  hidden lg:block'>
        <MiniProfile />

        <Suggestions />
      </section>
    </div>
  );
}
