import API_PATH from './API_PATH';

export default async function checkIsUserExists(user) {
  const sameUsers = await fetch(
    `${API_PATH}/users?email=${user.email.toLowerCase()}`
  ).then((res) => res.json());
  return { sameUsers };
}
