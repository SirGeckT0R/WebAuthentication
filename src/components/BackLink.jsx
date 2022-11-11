import React from 'react';
import { Link } from 'react-router-dom';

export default function BackLink({ path }) {
  return (
    <Link to={path} className='text-xl text-cyan-400 underline'>
      Back
    </Link>
  );
}
