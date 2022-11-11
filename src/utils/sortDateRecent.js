export default function sortDateRecent() {
  return (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();
}
