export default function TextAreaNote({ className, ...props }) {
  return (
    <textarea
      rows='4'
      name='content'
      className={
        'border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full ' +
        className
      }
      {...props}
    />
  );
}
