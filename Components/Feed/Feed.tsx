import React from 'react';
import Posts from './Posts/Posts';
import Stories from './Stories/Stories';

export default function Feed() {
  return (
    <div className='flex max-w-[790px] mt-4 mx-auto lg:max-w-[854px]'>
      <section className='border border-pink-700 max-w-[470px] mx-auto w-[100vw]'>
        <Stories />
        <Posts />
      </section>
      <section className='max-w-[320px] w-full mx-8 border border-slate-700 hidden lg:block'>
        {/* MiniProfile */}
        Test
        {/* Suggestions */}
      </section>
    </div>
  );
}
