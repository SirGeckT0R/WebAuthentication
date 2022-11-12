import React from 'react';
import CustomLink from '../components/CustomLink';

export default function PageNotFound() {
  return (
    <div className='flex flex-col items-center my-5 text-3xl'>
      <div className='font-bold underline'>404</div>
      <div className='text-2xl'>Page Not Found</div>
      <div className='flex gap-4 justify-center'>
        <div>Return to</div>
        <CustomLink path='/'>About</CustomLink>
      </div>
    </div>
  );
}
