export default function Icon({ icon }) {
  switch (icon) {
    case 'delete':
      return (
        <img alt='delete' height='20px' width='20px' src='/img/delete.png' />
      );
    case 'edit':
      return (
        <img alt='delete' height='20px' width='20px' src='/img/edit.png' />
      );
    default:
      return null;
  }
}
