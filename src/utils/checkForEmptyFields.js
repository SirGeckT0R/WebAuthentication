export default function checkForEmptyFields(user, setErrorMessage) {
  for (let key in user) {
    if (!user[key]) {
      setErrorMessage(`${key} is empty`);
      return false;
    }
  }
  return true;
}
