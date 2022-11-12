export default function CustomInput({ className, ...props }) {
  return (
    <input
      {...props}
      className={
        'border border-solid border-black bg-zinc-100 px-2 rounded-lg  ' +
        className
      }
    />
  );
}
