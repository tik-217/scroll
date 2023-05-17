import { IUsersApi } from '@/types';

export default async function getUsers(page: number) {
  return await fetch(
    `https://randomuser.me/api/?page=${page}&inc=name,email,picture&results=20&seed=abc`
  )
    .then((resp) => resp.json())
    .then((data: IUsersApi) => data.results);
}
