export default function Button({ handle, children }) {
  return (
    <button onClick={handle} className='hover:text-cyan-600 font-bold'>
      {children}
    </button>
  );
}
